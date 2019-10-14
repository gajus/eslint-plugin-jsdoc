import {parse} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';
import warnRemovedSettings from '../warnRemovedSettings';

const asExpression = /as\s+/;

export default iterateJsdoc(({
  jsdoc,
  report,
  utils,
  context,
}) => {
  warnRemovedSettings(context, 'valid-types');

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
      } catch (error) {
        let handled = false;

        if (tagName) {
          if (['memberof', 'memberof!'].includes(tagName)) {
            const endChar = namepath.slice(-1);
            if (['#', '.', '~'].includes(endChar)) {
              try {
                parse(namepath.slice(0, -1));
                handled = true;
              } catch (memberofError) {
                // Use the original error for including the whole type
              }
            }
          } else if (tagName === 'borrows') {
            const startChar = namepath.charAt();
            if (['#', '.', '~'].includes(startChar)) {
              try {
                parse(namepath.slice(1));
                handled = true;
              } catch (memberofError) {
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
      } catch (error) {
        report(`Syntax error in type: ${type}`, null, tag);

        return false;
      }

      return true;
    };

    const hasType = utils.tagMightHaveAType(tag.tag) && Boolean(tag.type);
    const mustHaveType = utils.tagMustHaveType(tag.tag);

    const hasNamePath = utils.tagMightHaveNamepath(tag.tag) && Boolean(tag.name) && !(tag.tag === 'see' && !checkSeesForNamepaths);
    const mustHaveNamepath = utils.tagMustHaveNamepath(tag.tag) && !allowEmptyNamepaths;

    const hasEither = utils.tagMightHaveEitherTypeOrNamepath(tag.tag) && hasType || hasNamePath;
    const mustHaveEither = utils.tagMustHaveEitherTypeOrNamepath(tag.tag);

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
      if (mustHaveEither && !hasEither) {
        report(`Tag @${tag.tag} must have either a type or namepath`, null, tag);

        return;
      }

      if (hasType) {
        validTypeParsing(tag.type);
      } else if (mustHaveType) {
        report(`Tag @${tag.tag} must have a type`, null, tag);
      }

      if (hasNamePath) {
        validNamepathParsing(tag.name, tag.tag);
      } else if (mustHaveNamepath) {
        report(`Tag @${tag.tag} must have a namepath`, null, tag);
      }
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
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
