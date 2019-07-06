import {parse} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';

const asExpression = /as\s+/;

export default iterateJsdoc(({
  jsdoc,
  report,
  utils
}) => {
  if (!jsdoc.tags) {
    return;
  }
  jsdoc.tags.forEach((tag) => {
    const validTypeParsing = function (type, tagName) {
      try {
        parse(type);
      } catch (err) {
        let error = err;

        if (tagName) {
          if (['memberof', 'memberof!'].includes(tagName)) {
            const endChar = type.slice(-1);
            if (['#', '.', '~'].includes(endChar)) {
              try {
                parse(type.slice(0, -1));
                error = {};
              } catch (memberofError) {
                // Use the original error for including the whole type
              }
            }
          } else if (tagName === 'borrows') {
            const startChar = type.charAt();
            if (['#', '.', '~'].includes(startChar)) {
              try {
                parse(type.slice(1));
                error = {};
              } catch (memberofError) {
                // Use the original error for including the whole type
              }
            }
          }
        }

        if (error.name === 'SyntaxError') {
          report(`Syntax error in type: ${type}`, null, tag);

          return false;
        }
      }

      return true;
    };

    if (tag.tag === 'borrows') {
      const thisNamepath = tag.description.replace(asExpression, '');

      if (!asExpression.test(tag.description) || !thisNamepath) {
        report(`@borrows must have an "as" expression. Found "${tag.description}"`, null, tag);

        return;
      }

      if (validTypeParsing(thisNamepath, 'borrows')) {
        const thatNamepath = tag.name;

        validTypeParsing(thatNamepath);
      }
    } else if (utils.isNamepathTag(tag.tag)) {
      if (utils.passesEmptyNamepathCheck(tag)) {
        return;
      }
      validTypeParsing(tag.name, tag.tag);
    } else if (tag.type && utils.isTagWithType(tag.tag)) {
      validTypeParsing(tag.type);
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    type: 'suggestion'
  }
});
