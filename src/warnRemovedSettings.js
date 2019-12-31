import WarnSettings from './WarnSettings';

const warnSettings = WarnSettings();

/**
 * @typedef {(
 *   | "require-jsdoc"
 *   | "require-returns"
 *   | "valid-types"
 *   | "require-example"
 *   | "check-examples"
 * )} RulesWithMovedSettings
 */

/**
 * @param {object} obj
 * @param {string} property
 * @returns {boolean}
 */
const has = (obj, property) => {
  return Object.prototype.hasOwnProperty.call(obj, property);
};

/**
 *
 * @param {RulesWithMovedSettings} ruleName
 * @returns {string[]}
 */
const getMovedSettings = (ruleName) => {
  switch (ruleName) {
  case 'require-jsdoc':
    return ['exemptEmptyFunctions'];
  case 'require-returns':
    return ['forceRequireReturn'];
  case 'valid-types':
    return ['allowEmptyNamepaths', 'checkSeesForNamepaths'];
  case 'require-example':
    return ['avoidExampleOnConstructors'];
  case 'check-examples':
    return [
      'captionRequired',
      'exampleCodeRegex',
      'rejectExampleCodeRegex',
      'allowInlineConfig',
      'noDefaultExampleRules',
      'matchingFileName',
      'configFile',

      // The old name for `checkEslintrc`
      'eslintrcForExamples',
      'baseConfig',
      'reportUnusedDisableDirectives',
    ];
  }

  /* istanbul ignore next */
  return [];
};

/**
 * @param {object} context
 * @param {RulesWithMovedSettings} ruleName
 */
export default function warnRemovedSettings (context, ruleName) {
  const movedSettings = getMovedSettings(ruleName);

  if (!context.settings || !context.settings.jsdoc) {
    return;
  }

  for (const setting of movedSettings) {
    if (
      has(context.settings.jsdoc, setting) &&
      !warnSettings.hasBeenWarned(context, setting)
    ) {
      context.report({
        loc: {
          start: {
            column: 1,
            line: 1,
          },
        },
        message: `\`settings.jsdoc.${setting}\` has been removed, ` +
          `use options in the rule \`${ruleName}\` instead.`,
      });
      warnSettings.markSettingAsWarned(context, setting);
    }
  }
}
