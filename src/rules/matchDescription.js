import _ from 'lodash';
import iterateJsdoc from '../iterateJsdoc';

const tagsWithDescriptions = ['param', 'arg', 'argument', 'returns', 'return'];

export default iterateJsdoc(({
  jsdoc,
  report,
  context,
  utils
}) => {
  const options = context.options[0] || {};

  const validateDescription = (description, tag) => {
    const regex = new RegExp(
      (tag && typeof options.tags[tag] === 'string' ? options.tags[tag] :
        options.matchDescription

      // If supporting Node >= 10, we could loosen to this for the
      //   initial letter: \\p{Upper}
      ) || '^([A-Z]|[`\\d_])([\\s\\S]*[.?!`])?$',
      'u'
    );

    if (!regex.test(description)) {
      report('JSDoc description does not satisfy the regex pattern.');

      return true;
    }

    return false;
  };

  if (jsdoc.description && validateDescription(jsdoc.description)) {
    return;
  }

  if (!options.tags || !Object.keys(options.tags).length) {
    return;
  }

  const tags = utils.filterTags(({tag}) => {
    return tagsWithDescriptions.includes(tag) &&
      {}.hasOwnProperty.call(options.tags, tag) && options.tags[tag];
  });

  tags.some((tag) => {
    const description = _.trimStart(tag.description, '- ');

    return validateDescription(description, tag.tag);
  });
});
