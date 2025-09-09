/* eslint-disable perfectionist/sort-imports -- For auto-generate; Do not remove */
import {
  merge,
} from 'object-deep-merge';

// BEGIN REPLACE
import index from './index-cjs.js';

// eslint-disable-next-line unicorn/prefer-export-from --- Reusing `index`
export default index;
// END REPLACE

/* eslint-disable jsdoc/valid-types -- Bug */
/**
 * @type {((
 *   cfg?: {
 *     mergeSettings?: boolean,
 *     config?: `flat/${import('./index-cjs.js').ConfigGroups}${import('./index-cjs.js').ConfigVariants}${import('./index-cjs.js').ErrorLevelVariants}`,
 *     settings?: Partial<import('./iterateJsdoc.js').Settings>,
 *     rules?: {[key in keyof import('./rules.d.ts').Rules]?: import('eslint').Linter.RuleEntry<import('./rules.d.ts').Rules[key]>}
 *   }
 * ) => import('eslint').Linter.Config)}
 */
/* eslint-enable jsdoc/valid-types -- Bug */
export const jsdoc = function (cfg) {
  /** @type {import('eslint').Linter.Config} */
  let outputConfig = {
    plugins: {
      jsdoc: index,
    },
  };
  if (
    cfg?.config
  ) {
    // @ts-expect-error Security check
    if (cfg.config === '__proto__') {
      throw new TypeError('Disallowed config value');
    }

    outputConfig = index.configs[cfg.config];
  }

  if (cfg?.rules) {
    outputConfig.rules = cfg.rules;
  }

  outputConfig.settings = {
    jsdoc: cfg?.mergeSettings === false ?
      cfg.settings :
      merge(
        {},
        cfg?.settings ?? {},
        cfg?.config?.includes('recommended') ?
          {
            // We may need to drop these for "typescript" (non-"flavor") configs,
            //   if support is later added: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
            structuredTags: {
              next: {
                required: [
                  'type',
                ],
              },
              throws: {
                required: [
                  'type',
                ],
              },
              yields: {
                required: [
                  'type',
                ],
              },
            },
          } :
          {},
      ),
  };

  return outputConfig;
};
