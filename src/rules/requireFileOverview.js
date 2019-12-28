import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  state,
  utils,
}) => {
  const targetTagName = utils.getPreferredTagName({tagName: 'file'});

  const hasFileOverview = targetTagName && utils.hasTag(targetTagName);

  if (state.hasFileOverview) {
    state.hasDuplicate = hasFileOverview;

    return;
  }

  state.hasFileOverview = hasFileOverview;
}, {
  exit ({state, utils}) {
    if (state.hasFileOverview && !state.hasDuplicate) {
      return;
    }
    const obj = utils.getPreferredTagNameObject({tagName: 'file'});
    if (obj && obj.blocked) {
      utils.reportSettings(
        `\`settings.jsdoc.tagNamePreference\` cannot block @${obj.tagName} ` +
        'for the `require-file-overview` rule',
      );
    } else {
      const targetTagName = obj && obj.replacement || obj;
      if (state.hasDuplicate) {
        utils.reportSettings(
          `Duplicate @${targetTagName}`,
        );
      } else {
        utils.reportSettings(`Missing @${targetTagName}`);
      }
    }
  },
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    type: 'suggestion',
  },
});
