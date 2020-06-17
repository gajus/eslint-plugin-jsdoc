import {parse} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';

const asExpression = /as\s+/u;

export default iterateJsdoc(({
  jsdoc,
  report,
  utils,
  context,
}) => {
  const {
    allowEmptyNamepaths = true,
    checkSeesForNamepaths = false,
  } = context.options[0] || {};

  if (!jsdoc.tags) {
    return;
  }
  jsdoc.tags.forEach((tag) => {
    const validNamepathParsing = function (namepath, tagName) {
      try {
        parse(namepath);
      } catch {
        let handled = false;

        if (tagName) {
          if (['memberof', 'memberof!'].includes(tagName)) {
            const endChar = namepath.slice(-1);
            if (['#', '.', '~'].includes(endChar)) {
              try {
                parse(namepath.slice(0, -1));
                handled = true;
              } catch {
                // Use the original error for including the whole type
              }
            }
          } else if (tagName === 'borrows') {
            const startChar = namepath.charAt();
            if (['#', '.', '~'].includes(startChar)) {
              try {
                parse(namepath.slice(1));
                handled = true;
              } catch {
                // Use the original error for including the whole type
              }
            }
          }
        }

        if (!handled) {
          report(`Syntax error in namepath: ${namepath}`, null, tag);

          return false;
        }
      }

      return true;
    };

    const validTypeParsing = function (type) {
      try {
        parse(type);
      } catch {
        report(`Syntax error in type: ${type}`, null, tag);

        return false;
      }

      return true;
    };

    const hasTypePosition = utils.tagMightHaveTypePosition(tag.tag) && Boolean(tag.type);
    const mustHaveTypePosition = utils.tagMustHaveTypePosition(tag.tag);

    const hasNameOrNamepathPosition = utils.tagMightHaveNamePosition(tag.tag) && Boolean(tag.name) && !(tag.tag === 'see' && !checkSeesForNamepaths);
    const mustHaveNameOrNamepathPosition = utils.tagMustHaveNamePosition(tag.tag) && !allowEmptyNamepaths;

    const hasEither = utils.tagMightHaveEitherTypeOrNamePosition(tag.tag) && hasTypePosition || hasNameOrNamepathPosition;
    const mustHaveEither = utils.tagMustHaveEitherTypeOrNamePosition(tag.tag);

    if (tag.tag === 'borrows') {
      const thisNamepath = tag.description.replace(asExpression, '');

      if (!asExpression.test(tag.description) || !thisNamepath) {
        report(`@borrows must have an "as" expression. Found "${tag.description}"`, null, tag);

        return;
      }

      if (validNamepathParsing(thisNamepath, 'borrows')) {
        const thatNamepath = tag.name;

        validNamepathParsing(thatNamepath);
      }
    } else {
      if (mustHaveEither && !hasEither && !mustHaveTypePosition) {
        report(`Tag @${tag.tag} must have either a type or namepath`, null, tag);

        return;
      }

      if (hasTypePosition) {
        validTypeParsing(tag.type);
      } else if (mustHaveTypePosition) {
        report(`Tag @${tag.tag} must have a type`, null, tag);
      }

      if (hasNameOrNamepathPosition) {
        validNamepathParsing(tag.name, tag.tag);
      } else if (mustHaveNameOrNamepathPosition) {
        report(`Tag @${tag.tag} must have a name/namepath`, null, tag);
      }
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'Requires all types to be valid JSDoc or Closure compiler types without syntax errors.',
    },
    schema: [
      {
        additionalProperies: false,
        properties: {
          allowEmptyNamepaths: {
            default: true,
            type: 'boolean',
          },
          checkSeesForNamepaths: {
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
