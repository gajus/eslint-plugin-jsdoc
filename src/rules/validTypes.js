import {
  tryParse, parse,
} from 'jsdoc-type-pratt-parser';
import iterateJsdoc from '../iterateJsdoc';

const asExpression = /as\s+/u;

export default iterateJsdoc(({
  jsdoc,
  report,
  utils,
  context,
  settings,
}) => {
  const {
    allowEmptyNamepaths = false,
  } = context.options[0] || {};
  const {mode} = settings;

  const tryParseIgnoreError = (path) => {
    try {
      if (mode === 'permissive') {
        tryParse(path);
      } else {
        parse(path, mode);
      }

      return true;
    } catch {
      // Keep the original error for including the whole type
    }

    return false;
  };

  // eslint-disable-next-line complexity
  jsdoc.tags.forEach((tag) => {
    const validNamepathParsing = function (namepath, tagName) {
      if (tryParseIgnoreError(namepath)) {
        return true;
      }
      let handled = false;

      if (tagName) {
        switch (tagName) {
        case 'module': {
          if (!namepath.startsWith('module:')) {
            handled = tryParseIgnoreError(`module:${namepath}`);
          }
          break;
        }
        case 'memberof': case 'memberof!': {
          const endChar = namepath.slice(-1);
          if (['#', '.', '~'].includes(endChar)) {
            handled = tryParseIgnoreError(namepath.slice(0, -1));
          }
          break;
        }
        case 'borrows': {
          const startChar = namepath.charAt();
          if (['#', '.', '~'].includes(startChar)) {
            handled = tryParseIgnoreError(namepath.slice(1));
          }
        }
        }
      }

      if (!handled) {
        report(`Syntax error in namepath: ${namepath}`, null, tag);

        return false;
      }

      return true;
    };

    const validTypeParsing = function (type) {
      try {
        if (mode === 'permissive') {
          tryParse(type);
        } else {
          parse(type, mode);
        }
      } catch {
        report(`Syntax error in type: ${type}`, null, tag);

        return false;
      }

      return true;
    };

    if (tag.tag === 'borrows') {
      const thisNamepath = utils.getTagDescription(tag).replace(asExpression, '').trim();

      if (!asExpression.test(utils.getTagDescription(tag)) || !thisNamepath) {
        report(`@borrows must have an "as" expression. Found "${utils.getTagDescription(tag)}"`, null, tag);

        return;
      }

      if (validNamepathParsing(thisNamepath, 'borrows')) {
        const thatNamepath = tag.name;

        validNamepathParsing(thatNamepath);
      }

      return;
    }

    const otherModeMaps = ['jsdoc', 'typescript', 'closure', 'permissive'].filter(
      (mde) => {
        return mde !== mode;
      },
    ).map((mde) => {
      return utils.getTagStructureForMode(mde);
    });

    const tagMightHaveNamePosition = utils.tagMightHaveNamePosition(tag.tag, otherModeMaps);
    if (tagMightHaveNamePosition !== true && tag.name) {
      const modeInfo = tagMightHaveNamePosition === false ? '' : ` in "${mode}" mode`;
      report(`@${tag.tag} should not have a name${modeInfo}.`, null, tag);

      return;
    }

    const mightHaveTypePosition = utils.tagMightHaveTypePosition(tag.tag, otherModeMaps);
    if (mightHaveTypePosition !== true && tag.type) {
      const modeInfo = mightHaveTypePosition === false ? '' : ` in "${mode}" mode`;
      report(`@${tag.tag} should not have a bracketed type${modeInfo}.`, null, tag);

      return;
    }

    // REQUIRED NAME
    const tagMustHaveNamePosition = utils.tagMustHaveNamePosition(tag.tag, otherModeMaps);

    // Don't handle `@param` here though it does require name as handled by
    //  `require-param-name` (`@property` would similarly seem to require one,
    //  but is handled by `require-property-name`)
    if (tagMustHaveNamePosition !== false && !tag.name && !allowEmptyNamepaths && ![
      'param', 'arg', 'argument',
      'property', 'prop',
    ].includes(tag.tag) &&
      (tag.tag !== 'see' || !utils.getTagDescription(tag).includes('{@link'))
    ) {
      const modeInfo = tagMustHaveNamePosition === true ? '' : ` in "${mode}" mode`;
      report(`Tag @${tag.tag} must have a name/namepath${modeInfo}.`, null, tag);

      return;
    }

    // REQUIRED TYPE
    const mustHaveTypePosition = utils.tagMustHaveTypePosition(tag.tag, otherModeMaps);
    if (mustHaveTypePosition !== false && !tag.type) {
      const modeInfo = mustHaveTypePosition === true ? '' : ` in "${mode}" mode`;
      report(`Tag @${tag.tag} must have a type${modeInfo}.`, null, tag);

      return;
    }

    // REQUIRED TYPE OR NAME/NAMEPATH
    const tagMissingRequiredTypeOrNamepath = utils.tagMissingRequiredTypeOrNamepath(tag, otherModeMaps);
    if (tagMissingRequiredTypeOrNamepath !== false && !allowEmptyNamepaths) {
      const modeInfo = tagMissingRequiredTypeOrNamepath === true ? '' : ` in "${mode}" mode`;
      report(`Tag @${tag.tag} must have either a type or namepath${modeInfo}.`, null, tag);

      return;
    }

    // VALID TYPE
    const hasTypePosition = mightHaveTypePosition === true && Boolean(tag.type);
    if (hasTypePosition) {
      validTypeParsing(tag.type);
    }

    // VALID NAME/NAMEPATH
    const hasNameOrNamepathPosition = (
      tagMustHaveNamePosition !== false ||
      utils.tagMightHaveNamepath(tag.tag)
    ) && Boolean(tag.name);

    if (hasNameOrNamepathPosition) {
      if (mode !== 'jsdoc' && tag.tag === 'template') {
        utils.parseClosureTemplateTag(tag).forEach((namepath) => {
          validNamepathParsing(namepath);
        });
      } else {
        validNamepathParsing(tag.name, tag.tag);
      }
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Requires all types to be valid JSDoc or Closure compiler types without syntax errors.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-valid-types',
    },
    schema: [
      {
        additionalProperies: false,
        properties: {
          allowEmptyNamepaths: {
            default: false,
            type: 'boolean',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
