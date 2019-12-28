import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  state,
  utils,
}) => {
  if (state.hasFileOverview) {
    return;
  }
  const targetTagName = utils.getPreferredTagName({tagName: 'file'});

  // Can we somehow prevent repeating execution of this non-exiting
  //  iterator instead of repeatedly checking the value above?
  state.hasFileOverview = targetTagName && utils.hasTag(targetTagName);
}, {
  exit ({state, utils}) {
    if (state.hasFileOverview) {
      return;
    }
    const obj = utils.getPreferredTagNameObject({tagName: 'file'});
    if (obj && obj.blocked) {
      utils.reportSettings(
        `\`settings.jsdoc.tagNamePreference\` cannot block @${obj.tagName} ` +
        'for the `require-file-overview` rule',
      );
    } else {
      utils.reportSettings(`Missing @${obj && obj.replacement || obj}`);
    }
  },
  iterateAllJsdocs: true,
  meta: {
    fixable: 'code',
    type: 'suggestion',
  },
});
