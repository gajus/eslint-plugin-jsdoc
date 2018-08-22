import _ from 'lodash';
import {parse} from 'jsdoctypeparser';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report
}) => {
  _.forEach(jsdoc.tags, (tag) => {
    if (tag.type) {
      try {
        parse(tag.type);
      } catch (error) {
        if (error.name === 'SyntaxError') {
          report(`Syntax error in type: ${tag.type}`);
        }
      }
    }
  });
});
