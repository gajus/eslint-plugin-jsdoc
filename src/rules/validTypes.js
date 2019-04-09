import _ from 'lodash';
import {parse} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';

/** @param {string} tag */
const isLink = (tag) => {
  return /^(@link|@linkcode|@linkplain|@tutorial) /.test(tag);
};

export default iterateJsdoc(({
  jsdoc,
  report
}) => {
  _.forEach(jsdoc.tags, (tag) => {
    if (tag.type && !isLink(tag.type)) {
      try {
        parse(tag.type);
      } catch (error) {
        if (error.name === 'SyntaxError') {
          report('Syntax error in type: ' + tag.type, null, tag);
        }
      }
    }
  });
});
