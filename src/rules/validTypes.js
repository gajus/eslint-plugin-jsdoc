import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';
import {parse} from 'jsdoctypeparser';

export default iterateJsdoc(({
  jsdoc,
  jsdocNode,
  sourceCode,
  report
}) => {
  _.forEach(jsdoc.tags, (tag) => {
    if (tag.type) {
      try {
        parse(tag.type);
      } catch (error) {
        if (error.name === 'SyntaxError') {
          report('Syntax error in type: ' + tag.type);
        }
      }
    }
  });
});
