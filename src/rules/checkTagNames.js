import iterateJsdoc from '../iterateJsdoc.js';
import {
  stringify as stringifyComment,
} from 'comment-parser';
import escapeStringRegexp from 'escape-string-regexp';

// https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
const jsxTagNames = new Set([
  'jsx',
  'jsxFrag',
  'jsxImportSource',
  'jsxRuntime',
]);

const typedTagsAlwaysUnnecessary = new Set([
  'augments',
  'callback',
  'class',
  'enum',
  'implements',
  'private',
  'property',
  'protected',
  'public',
  'readonly',
  'this',
  'type',
  'typedef',
]);

const typedTagsNeedingName = new Set([
  'template',
]);

const accessTags = new Set([
  'private',
  'protected',
  'public',
]);

/**
 * @param {import('eslint').Rule.Node|null} node
 * @returns {boolean}
 */
const isClassMember = (node) => {
  return node?.parent?.type === 'ClassBody';
};

/**
 * @param {import('@typescript-eslint/types').TSESTree.Node} member
 * @returns {string|undefined}
 */
const getObjectMemberName = (member) => {
  if (member.type !== 'Property' && member.type !== 'TSPropertySignature') {
    return undefined;
  }

  const typedMember = /** @type {import('@typescript-eslint/types').TSESTree.Property|import('@typescript-eslint/types').TSESTree.TSPropertySignature} */ (
    member
  );
  if (typedMember.computed && typedMember.key.type !== 'Literal') {
    return undefined;
  }

  const {
    key,
  } = typedMember;
  if (key.type === 'Identifier') {
    return key.name;
  }

  if (key.type === 'Literal' && typeof key.value === 'string') {
    return key.value;
  }

  return undefined;
};

/**
 * @param {import('@typescript-eslint/types').TSESTree.Node[]} members
 * @returns {Map<string, import('eslint').Rule.Node>}
 */
const indexObjectMembers = (members) => {
  /** @type {Map<string, import('eslint').Rule.Node>} */
  const properties = new Map();
  for (const member of members) {
    const name = getObjectMemberName(member);
    if (!name || properties.has(name)) {
      continue;
    }

    properties.set(name, /** @type {import('eslint').Rule.Node} */ (member));
  }

  return properties;
};

/**
 * Object expression or type literal whose properties can receive moved docs.
 * Export wrappers are unwrapped so `export const X = { ... }` is recognized.
 * @param {import('eslint').Rule.Node} node
 * @returns {Map<string, import('eslint').Rule.Node>|null}
 */
const getAttachedObjectProperties = (node) => {
  if (node.type === 'ExportNamedDeclaration') {
    const exported = /** @type {import('@typescript-eslint/types').TSESTree.ExportNamedDeclaration} */ (
      node
    ).declaration;
    if (!exported) {
      return null;
    }

    return getAttachedObjectProperties(/** @type {import('eslint').Rule.Node} */ (
      exported
    ));
  }

  if (node.type !== 'VariableDeclaration') {
    return null;
  }

  const variableDeclaration = /** @type {import('@typescript-eslint/types').TSESTree.VariableDeclaration} */ (
    node
  );
  const declarator = variableDeclaration.declarations[0];

  /* c8 ignore next 3 -- `VariableDeclaration` always has a declarator. */
  if (!declarator) {
    return null;
  }

  if (declarator.init?.type === 'ObjectExpression') {
    return indexObjectMembers(declarator.init.properties);
  }

  const typeAnnotation = declarator.id.type === 'Identifier' ?
    declarator.id.typeAnnotation?.typeAnnotation :
    undefined;
  if (typeAnnotation?.type === 'TSTypeLiteral') {
    return indexObjectMembers(typeAnnotation.members);
  }

  return null;
};

/**
 * Description text to move for `@prop NAME - description`, or `null` when
 * the tag is not that shape. A leading hyphen is the JSDoc separator.
 * @param {import('comment-parser').Spec} tag
 * @returns {string|null}
 */
const getPropertyTagDescription = (tag) => {
  if (!tag.name) {
    return null;
  }

  /** @type {string[]} */
  const lines = [];
  for (const src of tag.source) {
    if (src.tokens.end && !src.tokens.tag && !src.tokens.description) {
      break;
    }

    if (src.tokens.tag) {
      lines.push(src.tokens.description.replace(/^\s*-\s*/v, ''));
      continue;
    }

    lines.push(src.tokens.description);
  }

  const description = lines.join('\n').trim();
  return description || null;
};

const typedTagsUnnecessaryOutsideDeclare = new Set([
  'abstract',
  'access',
  'class',
  'constant',
  'constructs',
  'default',
  'enum',
  'export',
  'exports',
  'function',
  'global',
  'inherits',
  'instance',
  'interface',
  'member',
  'memberof',
  'memberOf',
  'method',
  'mixes',
  'mixin',
  'module',
  'name',
  'namespace',
  'override',
  'property',
  'requires',
  'static',
  'this',
]);

export default iterateJsdoc(({
  context,
  jsdoc,
  jsdocNode,
  node,
  report,
  settings,
  sourceCode,
  utils,
}) => {
  const
    /**
     * @type {{
     *   definedTags: string[],
     *   enableFixer: boolean,
     *   inlineTags: string[],
     *   jsxTags: boolean,
     *   typed: boolean
     }} */ {
      definedTags = [],
      enableFixer = true,
      inlineTags = [
        // jsdoc
        'link', 'linkcode', 'linkplain', 'tutorial',
        // https://tsdoc.org/pages/spec/tag_kinds/#inline-tags
        'inheritDoc',
        'label',
        // https://typedoc.org/documents/Tags.html#inline-tags
        'include', 'includeCode',
      ],
      jsxTags,
      typed,
    } = context.options[0] || {};

  /** @type {(string|undefined)[]} */
  let definedPreferredTags = [];
  const {
    structuredTags,
    tagNamePreference,
  } = settings;
  const definedStructuredTags = Object.keys(structuredTags);
  const definedNonPreferredTags = Object.keys(tagNamePreference);
  if (definedNonPreferredTags.length) {
    definedPreferredTags = Object.values(tagNamePreference).map((preferredTag) => {
      if (typeof preferredTag === 'string') {
        // May become an empty string but will be filtered out below
        return preferredTag;
      }

      if (!preferredTag) {
        return undefined;
      }

      if (typeof preferredTag !== 'object') {
        utils.reportSettings(
          'Invalid `settings.jsdoc.tagNamePreference`. Values must be falsy, a string, or an object.',
        );
      }

      return preferredTag.replacement;
    })
      .filter(Boolean);
  }

  /**
   * @param {import('eslint').Rule.Node} subNode
   * @returns {boolean}
   */
  const isInAmbientContext = (subNode) => {
    return subNode.type === 'Program' ?
      /* c8 ignore next 2 -- Support old ESLint */
      // @ts-expect-error ESLint < 10
      (context.filename ?? context.getFilename()).endsWith('.d.ts') :
      Boolean(
        /** @type {import('@typescript-eslint/types').TSESTree.VariableDeclaration} */ (
          subNode
        ).declare,
      ) || isInAmbientContext(subNode.parent);
  };

  /**
   * @param {import('comment-parser').Spec} jsdocTag
   * @returns {boolean}
   */
  const tagIsRedundantWhenTyped = (jsdocTag) => {
    if (!typedTagsUnnecessaryOutsideDeclare.has(jsdocTag.tag)) {
      return false;
    }

    if (jsdocTag.tag === 'default') {
      return false;
    }

    if (node === null) {
      return false;
    }

    /* c8 ignore next 2 -- Support old ESLint */
    // @ts-expect-error ESLint < 10
    if ((context.filename ?? context.getFilename()).endsWith('.d.ts') && [
      null, 'Program', undefined,
    ].includes(node?.parent?.type)) {
      return false;
    }

    if (isInAmbientContext(/** @type {import('eslint').Rule.Node} */ (node))) {
      return false;
    }

    return true;
  };

  /**
   * @param {string} message
   * @param {import('comment-parser').Spec} jsdocTag
   * @param {import('../iterateJsdoc.js').Integer} tagIndex
   * @param {Partial<import('comment-parser').Tokens>} [additionalTagChanges]
   * @returns {void}
   */
  const reportWithTagRemovalFixer = (message, jsdocTag, tagIndex, additionalTagChanges) => {
    utils.reportJSDoc(message, jsdocTag, enableFixer ? () => {
      if (jsdocTag.description.trim()) {
        utils.changeTag(jsdocTag, {
          postType: '',
          type: '',
          ...additionalTagChanges,
        });
      } else {
        utils.removeTag(tagIndex, {
          removeEmptyBlock: true,
        });
      }
    } : null, true);
  };

  /**
   * @param {import('comment-parser').Spec} jsdocTag
   * @param {import('../iterateJsdoc.js').Integer} tagIndex
   * @returns {boolean}
   */
  const checkTagForTypedValidity = (jsdocTag, tagIndex) => {
    if (
      typedTagsAlwaysUnnecessary.has(jsdocTag.tag) &&
      // TypeScript only has syntax for these on class members; elsewhere they
      //   are not redundant (e.g., TSDoc/API Extractor release tag `@public`,
      //   TypeDoc's `@private`/`@protected` visibility, Knip's `@public`)
      (!accessTags.has(jsdocTag.tag) || isClassMember(node))
    ) {
      reportWithTagRemovalFixer(
        `'@${jsdocTag.tag}' is redundant when using a type system.`,
        jsdocTag,
        tagIndex,
        {
          postTag: '',
          tag: '',
        },
      );
      return true;
    }

    if (tagIsRedundantWhenTyped(jsdocTag)) {
      reportWithTagRemovalFixer(
        `'@${jsdocTag.tag}' is redundant outside of ambient (\`declare\`/\`.d.ts\`) contexts when using a type system.`,
        jsdocTag,
        tagIndex,
      );
      return true;
    }

    if (typedTagsNeedingName.has(jsdocTag.tag) && !jsdocTag.name) {
      reportWithTagRemovalFixer(
        `'@${jsdocTag.tag}' without a name is redundant when using a type system.`,
        jsdocTag,
        tagIndex,
      );
      return true;
    }

    return false;
  };

  /**
   * @param {import('eslint').Rule.Node} propNode
   * @returns {boolean}
   */
  const propertyHasJsdoc = (propNode) => {
    return sourceCode.getCommentsBefore(propNode).some((comment) => {
      return comment.type === 'Block' && comment.value.startsWith('*');
    });
  };

  /**
   * @param {string} tagName
   * @returns {boolean}
   */
  const isRelocatablePropertyTag = (tagName) => {
    return tagName === 'property' ||
      tagName === 'prop' && !Object.hasOwn(tagNamePreference, 'prop');
  };

  /**
   * @param {string} commentText
   * @returns {boolean}
   */
  const commentHasText = (commentText) => {
    return commentText.split(/\r?\n/v).some((line) => {
      return (/\S/v).test(line.replaceAll('*', '').replaceAll('/', ''));
    });
  };

  /**
   * @param {import('eslint').Rule.RuleFixer} fixer
   * @returns {import('eslint').Rule.Fix}
   */
  const removeJsdocFix = (fixer) => {
    const text = sourceCode.text;
    const lastLineBreakPos = text.slice(0, jsdocNode.range[0]).search(/\n[ \t]*$/v);
    if (lastLineBreakPos > -1) {
      return fixer.removeRange([
        lastLineBreakPos, jsdocNode.range[1],
      ]);
    }

    return fixer.removeRange(
      (/\s/v).test(text.charAt(jsdocNode.range[1])) ?
        [
          jsdocNode.range[0], jsdocNode.range[1] + 1,
        ] :
        jsdocNode.range,
    );
  };

  /**
   * Same end state as the per-tag redundant-property fixer, but applied to
   * every `@prop`/`@property` in this block at once. Doing them together
   * avoids a later pass relocating whichever names still remain.
   * @param {import('comment-parser').Spec[]} tags
   * @returns {string}
   */
  const stripPropertyTags = (tags) => {
    /** @type {Set<number>} */
    const clearTagLine = new Set();
    /** @type {Set<number>} */
    const dropLines = new Set();
    for (const tag of tags) {
      if (tag.description.trim()) {
        clearTagLine.add(tag.source[0].number);
        continue;
      }

      for (const src of tag.source) {
        if (src.tokens.end && !src.tokens.tag) {
          break;
        }

        dropLines.add(src.number);
      }
    }

    const cloned = structuredClone(jsdoc);
    cloned.source = cloned.source.flatMap((line) => {
      if (dropLines.has(line.number)) {
        return [];
      }

      if (!clearTagLine.has(line.number)) {
        return [
          line,
        ];
      }

      return [
        {
          ...line,
          tokens: {
            ...line.tokens,
            postTag: '',
            postType: '',
            tag: '',
            type: '',
          },
        },
      ];
    });

    const stripped = stringifyComment(cloned);
    return commentHasText(stripped) ? stripped : '';
  };

  /**
   * Relocate every redundant `@prop`/`@property` description onto a matching
   * property, or strip those tags in one step when the object is recognized
   * but not every tag can be moved.
   * @returns {import('eslint').Rule.ReportFixer|null}
   */
  const getPropertyRelocationFixer = () => {
    if (!typed || !enableFixer || !node) {
      return null;
    }

    const properties = getAttachedObjectProperties(node);
    if (!properties) {
      return null;
    }

    /** @type {import('comment-parser').Spec[]} */
    const propertyTags = jsdoc.tags.filter((jsdocTag) => {
      return isRelocatablePropertyTag(jsdocTag.tag);
    });
    if (!propertyTags.length) {
      return null;
    }

    /**
     * @type {{
     *   description: string,
     *   prop: import('eslint').Rule.Node,
     *   tag: import('comment-parser').Spec
     * }[]}
     */
    const moves = [];
    /** @type {Set<string>} */
    const seenNames = new Set();
    let canRelocate = true;
    for (const jsdocTag of propertyTags) {
      const description = getPropertyTagDescription(jsdocTag);
      const prop = description ? properties.get(jsdocTag.name) : undefined;
      if (!description || !prop || propertyHasJsdoc(prop) || seenNames.has(jsdocTag.name)) {
        canRelocate = false;
        break;
      }

      seenNames.add(jsdocTag.name);
      moves.push({
        description,
        prop,
        tag: jsdocTag,
      });
    }

    if (!canRelocate) {
      const stripped = stripPropertyTags(propertyTags);
      return (fixer) => {
        return stripped ? fixer.replaceText(jsdocNode, stripped) : removeJsdocFix(fixer);
      };
    }

    return (fixer) => {
      /** @type {import('eslint').Rule.Fix[]} */
      const fixes = [];
      const lineBreak = sourceCode.text.includes('\r\n') ? '\r\n' : '\n';
      const commentText = sourceCode.getText(jsdocNode);
      const commentLines = commentText.split(/\r?\n/v);
      /** @type {Set<number>} */
      const removeOffsets = new Set();
      for (const move of moves) {
        const srcLines = move.tag.source;
        removeOffsets.add(srcLines[0].number);
        for (const line of srcLines.slice(1)) {
          if (line.tokens.tag || line.tokens.end) {
            break;
          }

          removeOffsets.add(line.number);
        }
      }

      const kept = commentLines.filter((_, idx) => {
        return !removeOffsets.has(idx);
      });
      if (commentHasText(kept.join('\n'))) {
        let nextLines = kept;
        const indent = /** @type {RegExpExecArray} */ (
          (/^[ \t]*/v).exec(/** @type {string} */ (commentLines[0]))
        )[0];
        if (!nextLines.some((line) => {
          return line.includes('/**');
        })) {
          nextLines = [
            `${indent}/**`, ...nextLines,
          ];
        }

        if (!nextLines.at(-1)?.includes('*/')) {
          nextLines = [
            ...nextLines, `${indent} */`,
          ];
        }

        fixes.push(fixer.replaceText(jsdocNode, nextLines.join(lineBreak)));
      } else {
        fixes.push(removeJsdocFix(fixer));
      }

      for (const move of moves) {
        const propLine = /** @type {string} */ (sourceCode.lines[
          /** @type {import('eslint').AST.SourceLocation} */
          (move.prop.loc).start.line - 1
        ]);
        const indent = /** @type {RegExpExecArray} */ (
          (/^[ \t]*/v).exec(propLine)
        )[0];
        const descriptionLines = move.description.split('\n');
        const insertion = `/**${lineBreak}${descriptionLines.map((line) => {
          return `${indent} *${line ? ` ${line}` : ''}`;
        }).join(lineBreak)}${lineBreak}${indent} */${lineBreak}${indent}`;
        fixes.push(fixer.insertTextBefore(move.prop, insertion));
      }

      return fixes;
    };
  };

  const propertyRelocationFixer = getPropertyRelocationFixer();

  for (let tagIndex = 0; tagIndex < jsdoc.tags.length; tagIndex += 1) {
    const jsdocTag = jsdoc.tags[tagIndex];
    const tagName = jsdocTag.tag;

    if (propertyRelocationFixer && isRelocatablePropertyTag(tagName)) {
      const message = tagName === 'property' ?
        `'@${tagName}' is redundant when using a type system.` :
        `Invalid JSDoc tag (preference). Replace "${tagName}" JSDoc tag with "property".`;
      report(message, propertyRelocationFixer, jsdocTag);
      continue;
    }

    if (jsxTags && jsxTagNames.has(tagName)) {
      continue;
    }

    if (typed && checkTagForTypedValidity(jsdocTag, tagIndex)) {
      continue;
    }

    const validTags = [
      ...definedTags,
      ...(/** @type {string[]} */ (definedPreferredTags)),
      ...definedNonPreferredTags,
      ...definedStructuredTags,
      ...typed ? typedTagsNeedingName : [],
    ];

    if (utils.isValidTag(tagName, validTags)) {
      let preferredTagName = utils.getPreferredTagName({
        allowObjectReturn: true,
        defaultMessage: `Blacklisted tag found (\`@${tagName}\`)`,
        tagName,
      });
      if (!preferredTagName) {
        continue;
      }

      let message;
      if (typeof preferredTagName === 'object') {
        ({
          message,
          replacement: preferredTagName,
        } = /** @type {{message: string; replacement?: string | undefined;}} */ (
          preferredTagName
        ));
      }

      if (!message) {
        message = `Invalid JSDoc tag (preference). Replace "${tagName}" JSDoc tag with "${preferredTagName}".`;
      }

      if (preferredTagName !== tagName) {
        report(message, (fixer) => {
          const replacement = sourceCode.getText(jsdocNode).replace(
            new RegExp(`@${escapeStringRegexp(tagName)}\\b`, 'v'),
            `@${preferredTagName}`,
          );

          return fixer.replaceText(jsdocNode, replacement);
        }, jsdocTag);
      }
    } else {
      report(`Invalid JSDoc tag name "${tagName}".`, null, jsdocTag);
    }
  }

  for (const inlineTag of utils.getInlineTags()) {
    if (!inlineTags.includes(inlineTag.tag)) {
      report(`Invalid JSDoc inline tag name "${inlineTag.tag}"`, null, inlineTag);
    }
  }
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Reports invalid block tag names.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/check-tag-names.md#repos-sticky-header',
    },
    fixable: 'code',
    schema: [
      {
        additionalProperties: false,
        properties: {
          definedTags: {
            description: `Use an array of \`definedTags\` strings to configure additional, allowed tags.
The format is as follows:

\`\`\`json
{
  "definedTags": ["note", "record"]
}
\`\`\``,
            items: {
              type: 'string',
            },
            type: 'array',
          },
          enableFixer: {
            description: 'Set to `false` to disable auto-removal of types that are redundant with the [`typed` option](#typed).',
            type: 'boolean',
          },
          inlineTags: {
            description: `List of tags to allow inline.

Defaults to array of \`'link', 'linkcode', 'linkplain', 'tutorial', 'inheritDoc', 'label', 'include', and 'includeCode'\``,
            items: {
              type: 'string',
            },
            type: 'array',
          },
          jsxTags: {
            description: `If this is set to \`true\`, all of the following tags used to control JSX output are allowed:

\`\`\`
jsx
jsxFrag
jsxImportSource
jsxRuntime
\`\`\`

For more information, see the [babel documentation](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx).`,
            type: 'boolean',
          },
          typed: {
            description: `If this is set to \`true\`, additionally checks for tag names that are redundant when using a type checker such as TypeScript.

These tags are always unnecessary when using TypeScript or similar:

\`\`\`
augments
callback
class
enum
implements
property
readonly
this
type
typedef
\`\`\`

These tags are unnecessary on class members (where TypeScript has access
modifiers), but are allowed elsewhere (e.g., the \`@public\` release tag of
TSDoc/API Extractor on an exported function):

\`\`\`
private
protected
public
\`\`\`

These tags are unnecessary except when inside a TypeScript \`declare\` context:

\`\`\`
abstract
access
class
constant
constructs
default
enum
export
exports
function
global
inherits
instance
interface
member
memberof
memberOf
method
mixes
mixin
module
name
namespace
override
property
requires
static
this
\`\`\``,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
