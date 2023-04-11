import defaultTagOrder from '../defaultTagOrder';
import iterateJsdoc from '../iterateJsdoc';

// eslint-disable-next-line complexity -- Temporary
export default iterateJsdoc(({
  context,
  jsdoc,
  utils,
}) => {
  const {
    linesBetween = 1,
    tagSequence = defaultTagOrder,
    alphabetizeExtras = false,
    reportTagGroupSpacing = true,
    reportIntraTagGroupSpacing = true,
  } = context.options[0] || {};

  const tagList = tagSequence.flatMap((obj) => {
    /* typeof obj === 'string' ? obj : */
    return obj.tags;
  });

  const otherPos = tagList.indexOf('-other');
  const endPos = otherPos > -1 ? otherPos : tagList.length;

  let ongoingCount = 0;
  for (const [
    idx,
    tag,
  ] of jsdoc.tags.entries()) {
    tag.originalIndex = idx;
    ongoingCount += tag.source.length;
    tag.originalLine = ongoingCount;
  }

  let firstChangedTagLine;
  let firstChangedTagIndex;
  const sortedTags = JSON.parse(JSON.stringify(jsdoc.tags));
  sortedTags.sort(({
    tag: tagNew,
  }, {
    originalIndex,
    originalLine,
    tag: tagOld,
  }) => {
    // Optimize: Just keep relative positions if the same tag name
    if (tagNew === tagOld) {
      return 0;
    }

    const checkOrSetFirstChanged = () => {
      if (!firstChangedTagLine || originalLine < firstChangedTagLine) {
        firstChangedTagLine = originalLine;
        firstChangedTagIndex = originalIndex;
      }
    };

    const newPos = tagList.indexOf(tagNew);
    const oldPos = tagList.indexOf(tagOld);

    const preferredNewPos = newPos === -1 ? endPos : newPos;
    const preferredOldPos = oldPos === -1 ? endPos : oldPos;

    if (preferredNewPos < preferredOldPos) {
      checkOrSetFirstChanged();
      return -1;
    }

    if (preferredNewPos > preferredOldPos) {
      return 1;
    }

    // preferredNewPos === preferredOldPos
    if (
      !alphabetizeExtras ||

      // Optimize: If tagNew (or tagOld which is the same) was found in the
      //   priority array, it can maintain its relative position—without need
      //   of alphabetizing (secondary sorting)
      newPos >= 0
    ) {
      return 0;
    }

    if (tagNew < tagOld) {
      checkOrSetFirstChanged();
      return -1;
    }

    // tagNew > tagOld
    return 1;
  });

  if (firstChangedTagLine === undefined) {
    // Should be ordered by now

    const lastTagsOfGroup = [];
    const badLastTagsOfGroup = [];

    const countTagEmptyLines = (tag) => {
      return tag.source.reduce((acc, {
        tokens: {
          description,
          name,
          type,
          end,
          tag: tg,
        },
      }) => {
        const empty = !tg && !type && !name && !description;
        // Reset the count so long as there is content
        return empty ? acc + (empty && !end) : 0;
      }, 0);
    };

    let idx = 0;
    for (const {
      tags,
    } of tagSequence) {
      let innerIdx;
      let currentTag;
      let lastTag;
      do {
        currentTag = jsdoc.tags[idx];
        if (!currentTag) {
          idx++;
          break;
        }

        innerIdx = tags.indexOf(currentTag.tag);

        if (
          innerIdx === -1 &&
          // eslint-disable-next-line no-loop-func -- Safe
          (!tags.includes('-other') || tagSequence.some(({
            tags: tgs,
          }) => {
            return tgs.includes(currentTag.tag);
          }))
        ) {
          idx++;
          break;
        }

        lastTag = currentTag;

        idx++;
      } while (true);

      idx--;

      if (lastTag) {
        lastTagsOfGroup.push(lastTag);
        const ct = countTagEmptyLines(lastTag);
        if (
          ct !== linesBetween &&
          // Use another rule for adding to end (should be of interest outside this rule)
          jsdoc.tags[idx]
        ) {
          badLastTagsOfGroup.push([
            lastTag, ct,
          ]);
        }
      }
    }

    if (reportTagGroupSpacing && badLastTagsOfGroup.length) {
      const fixer = (tg) => {
        return () => {
          // Due to https://github.com/syavorsky/comment-parser/issues/110 ,
          //  we have to modify `jsdoc.source` rather than just modify tags
          //  directly
          for (const [
            currIdx,
            {
              tokens,
            },
          ] of jsdoc.source.entries()) {
            if (tokens.tag !== '@' + tg.tag) {
              continue;
            }

            // Cannot be `tokens.end`, as dropped off last tag, so safe to
            //  go on
            let newIdx = currIdx;

            const emptyLine = () => {
              return {
                tokens: utils.seedTokens({
                  delimiter: '*',
                  start: jsdoc.source[newIdx - 1].tokens.start,
                }),
              };
            };

            let existingEmptyLines = 0;
            while (true) {
              const nextTokens = jsdoc.source[++newIdx]?.tokens;

              /* istanbul ignore if -- Guard */
              if (!nextTokens) {
                return;
              }

              // Should be no `nextTokens.end` to worry about since ignored
              //  if not followed by tag

              if (nextTokens.tag) {
                // Haven't made it to last tag instance yet, so keep looking
                if (nextTokens.tag === tokens.tag) {
                  existingEmptyLines = 0;
                  continue;
                }

                const lineDiff = linesBetween - existingEmptyLines;
                if (lineDiff > 0) {
                  const lines = Array.from({
                    length: lineDiff,
                  }, () => {
                    return emptyLine();
                  });
                  jsdoc.source.splice(newIdx, 0, ...lines);
                } else {
                  // lineDiff < 0
                  jsdoc.source.splice(
                    newIdx + lineDiff,
                    -lineDiff,
                  );
                }

                break;
              }

              const empty = !nextTokens.type && !nextTokens.name &&
                !nextTokens.description;

              if (empty) {
                existingEmptyLines++;
              } else {
                // Has content again, so reset empty line count
                existingEmptyLines = 0;
              }
            }

            break;
          }

          for (const [
            srcIdx,
            src,
          ] of jsdoc.source.entries()) {
            src.number = srcIdx;
          }
        };
      };

      for (const [
        tg,
        ct,
      ] of badLastTagsOfGroup) {
        utils.reportJSDoc(
          'Tag groups do not have the expected whitespace',
          tg,
          fixer(tg, ct),
        );
      }

      return;
    }

    if (!reportIntraTagGroupSpacing) {
      return;
    }

    for (const [
      tagIdx,
      tag,
    ] of jsdoc.tags.entries()) {
      if (!jsdoc.tags[tagIdx + 1] || lastTagsOfGroup.includes(tag)) {
        continue;
      }

      const ct = countTagEmptyLines(tag);
      if (ct) {
        // eslint-disable-next-line complexity -- Temporary
        const fixer = () => {
          let foundFirstTag = false;
          let currentTag;
          for (const [
            currIdx,
            {
              tokens: {
                description,
                name,
                type,
                end,
                tag: tg,
              },
            },
          ] of jsdoc.source.entries()) {
            if (tg) {
              foundFirstTag = true;
              currentTag = tg;
            }

            if (!foundFirstTag) {
              continue;
            }

            if (currentTag && !tg && !type && !name && !description && !end) {
              let nextIdx = currIdx;

              let ignore = true;
              // Even if a tag of the same name as the last tags in a group,
              //  could still be an earlier tag in that group

              // eslint-disable-next-line no-loop-func -- Safe
              if (lastTagsOfGroup.some((lastTagOfGroup) => {
                return currentTag === '@' + lastTagOfGroup.tag;
              })) {
                while (true) {
                  const nextTokens = jsdoc.source[++nextIdx]?.tokens;
                  if (!nextTokens) {
                    break;
                  }

                  if (!nextTokens.tag) {
                    continue;
                  }

                  // Followed by the same tag name, so not actually last in group,
                  //   and of interest
                  if (nextTokens.tag === currentTag) {
                    ignore = false;
                  }
                }
              } else {
                while (true) {
                  const nextTokens = jsdoc.source[++nextIdx]?.tokens;
                  if (!nextTokens || nextTokens.end) {
                    break;
                  }

                  // Not the very last tag, so don't ignore
                  if (nextTokens.tag) {
                    ignore = false;
                    break;
                  }
                }
              }

              if (!ignore) {
                jsdoc.source.splice(currIdx, 1);
                for (const [
                  srcIdx,
                  src,
                ] of jsdoc.source.entries()) {
                  src.number = srcIdx;
                }
              }
            }
          }
        };

        utils.reportJSDoc(
          'Intra-group tags have unexpected whitespace',
          tag,
          fixer,
        );
      }
    }

    return;
  }

  const firstLine = utils.getFirstLine();

  const fix = () => {
    const itemsToMoveRange = [
      ...Array.from({
        length: jsdoc.tags.length - firstChangedTagIndex,
      }).keys(),
    ];

    const unchangedPriorTagDescriptions = jsdoc.tags.slice(
      0,
      firstChangedTagIndex,
    ).reduce((ct, {
      source,
    }) => {
      return ct + source.length - 1;
    }, 0);

    // This offset includes not only the offset from where the first tag
    //   must begin, and the additional offset of where the first changed
    //   tag begins, but it must also account for prior descriptions
    const initialOffset = firstLine + firstChangedTagIndex +

      // May be the first tag, so don't try finding a prior one if so
      unchangedPriorTagDescriptions;

    // Use `firstChangedTagLine` for line number to begin reporting/splicing
    for (const idx of itemsToMoveRange) {
      utils.removeTag(idx + firstChangedTagIndex);
    }

    const changedTags = sortedTags.slice(firstChangedTagIndex);
    let extraTagCount = 0;

    for (const idx of itemsToMoveRange) {
      const changedTag = changedTags[idx];

      utils.addTag(
        changedTag.tag,
        extraTagCount + initialOffset + idx,
        {
          ...changedTag.source[0].tokens,

          // `comment-parser` puts the `end` within the `tags` section, so
          //   avoid adding another to jsdoc.source
          end: '',
        },
      );

      for (const {
        tokens,
      } of changedTag.source.slice(1)) {
        if (!tokens.end) {
          utils.addLine(
            extraTagCount + initialOffset + idx + 1,
            {
              ...tokens,
              end: '',
            },
          );
          extraTagCount++;
        }
      }
    }
  };

  utils.reportJSDoc(
    `Tags are not in the prescribed order: ${
      tagList.join(', ') || '(alphabetical)'
    }`,
    jsdoc.tags[firstChangedTagIndex],
    fix,
    true,
  );
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Sorts tags by a specified sequence according to tag name.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-sort-tags',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          alphabetizeExtras: {
            type: 'boolean',
          },
          linesBetween: {
            type: 'integer',
          },
          reportIntraTagGroupSpacing: {
            type: 'boolean',
          },
          reportTagGroupSpacing: {
            type: 'boolean',
          },
          tagSequence: {
            items: {
              properties: {
                tags: {
                  items: {
                    type: 'string',
                  },
                  type: 'array',
                },
              },
              type: 'object',
            },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
