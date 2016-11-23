import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  jsdoc,
  report,
  context
}) => {
  let always;

  if (!jsdoc.description || !jsdoc.tags.length) {
    return;
  }

  if (_.has(context.options, 0)) {
    always = context.options[0] === 'always';
  } else {
    always = true;
  }

  // The contents of the jsdoc.source and of jsdoc.description is left trimmed.
  // The contents of the jsdoc.description is right trimmed.
  // This gets the text following the description.
  const descriptionEndsWithANewline = _.startsWith(jsdoc.source.slice(jsdoc.description.length), '\n\n');

  if (always) {
    if (!descriptionEndsWithANewline) {
      report('There must be a newline after the description of the JSDoc block.');
    }
  } else if (descriptionEndsWithANewline) {
    report('There must be no newline after the description of the JSDoc block.');
  }
});
