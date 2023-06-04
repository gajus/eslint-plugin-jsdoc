/* eslint-disable no-console -- CLI */

/**
 * @example
 *
 * ```shell
 * npm run create-rule my-new-rule -- --recommended
 * ```
 */

import camelCase from 'camelcase';
import {
  existsSync,
} from 'fs';
import fs from 'fs/promises';
import open from 'open-editor';
import {
  resolve,
} from 'path';

// Todo: Would ideally have prompts, e.g., to ask for whether
//   type was problem/layout, etc.

const [
  , , ruleName,
  ...options
] = process.argv;

const recommended = options.includes('--recommended');

(async () => {
  if (!ruleName) {
    console.error('Please supply a rule name');

    return;
  }

  if ((/[A-Z]/u).test(ruleName)) {
    console.error('Please ensure the rule has no capital letters');

    return;
  }

  const ruleNamesPath = './test/rules/ruleNames.json';
  // @ts-expect-error Older types?
  const ruleNames = JSON.parse(await fs.readFile(
    ruleNamesPath,
  ));
  if (!ruleNames.includes(ruleName)) {
    ruleNames.push(ruleName);
    ruleNames.sort();
  }

  await fs.writeFile(ruleNamesPath, JSON.stringify(ruleNames, null, 2) + '\n');
  console.log('ruleNames', ruleNames);

  const ruleTemplate = `import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  context,
  utils,
}) => {
  // Rule here
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: '',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/${ruleName}.md#repos-sticky-header',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          // Option properties here (or remove the object)
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
`;

  const camelCasedRuleName = camelCase(ruleName);

  const rulePath = `./src/rules/${camelCasedRuleName}.js`;

  if (!existsSync(rulePath)) {
    await fs.writeFile(rulePath, ruleTemplate);
  }

  const ruleTestTemplate = `export default {
  invalid: [
    {
      code: \`
      \`,
      errors: [
        {
          line: 2,
          message: '',
        },
      ],
    },
  ],
  valid: [
    {
      code: \`
      \`,
    },
  ],
};
`;

  const ruleTestPath = `./test/rules/assertions/${camelCasedRuleName}.js`;
  if (!existsSync(ruleTestPath)) {
    await fs.writeFile(ruleTestPath, ruleTestTemplate);
  }

  const ruleReadmeTemplate = `### \`${ruleName}\`

|||
|---|---|
|Context|everywhere|
|Tags|\`\`|
|Recommended|${recommended ? 'true' : 'false'}|
|Settings||
|Options||

## Failing examples

<!-- assertions-failing ${camelCasedRuleName} -->

## Passing examples

<!-- assertions-passing ${camelCasedRuleName} -->
`;

  const ruleReadmePath = `./.README/rules/${ruleName}.md`;
  if (!existsSync(ruleReadmePath)) {
    await fs.writeFile(ruleReadmePath, ruleReadmeTemplate);
  }

  /**
   * @param {object} cfg
   * @param {string} cfg.path
   * @param {RegExp} cfg.oldRegex
   * @param {string} cfg.checkName
   * @param {string} cfg.newLine
   * @param {boolean} [cfg.oldIsCamel]
   * @returns {Promise<void>}
   */
  const replaceInOrder = async ({
    path,
    oldRegex,
    checkName,
    newLine,
    oldIsCamel,
  }) => {
    /**
     * @typedef {number} Integer
     */
    /**
     * @typedef {{
     *   matchedLine: string,
     *   offset: Integer,
     *   oldRule: string,
     * }} OffsetInfo
     */
    /**
     * @type {OffsetInfo[]}
     */
    const offsets = [];

    let readme = await fs.readFile(path, 'utf8');
    readme.replace(
      oldRegex,
      /**
       * @param {string} matchedLine
       * @param {string} n1
       * @param {Integer} offset
       * @param {string} str
       * @param {object} groups
       * @param {string} groups.oldRule
       * @returns {string}
       */
      (matchedLine, n1, offset, str, {
        oldRule,
      }) => {
        offsets.push({
          matchedLine,
          offset,
          oldRule,
        });

        return matchedLine;
      },
    );

    offsets.sort(({
      oldRule,
    }, {
      oldRule: oldRuleB,
    }) => {
      return oldRule < oldRuleB ? -1 : (oldRule > oldRuleB ? 1 : 0);
    });

    let alreadyIncluded = false;
    const itemIndex = offsets.findIndex(({
      oldRule,
    }) => {
      alreadyIncluded ||= oldIsCamel ? camelCasedRuleName === oldRule : ruleName === oldRule;

      return oldIsCamel ? camelCasedRuleName < oldRule : ruleName < oldRule;
    });
    let item = itemIndex !== undefined && offsets[itemIndex];
    if (item && itemIndex === 0 &&

      // This property would not always be sufficient but in this case it is.
      oldIsCamel
    ) {
      item.offset = 0;
    }

    if (!item) {
      item = /** @type {OffsetInfo} */ (offsets.pop());
      item.offset += item.matchedLine.length;
    }

    if (alreadyIncluded) {
      console.log(`Rule name is already present in ${checkName}.`);
    } else {
      readme = readme.slice(0, item.offset) +
                (item.offset ? '\n' : '') +
                newLine +
                (item.offset ? '' : '\n') +
                readme.slice(item.offset);

      await fs.writeFile(path, readme);
    }
  };

  // await replaceInOrder({
  //   checkName: 'README',
  //   newLine: `{"gitdown": "include", "file": "./rules/${ruleName}.md"}`,
  //   oldRegex: /\n\{"gitdown": "include", "file": ".\/rules\/(?<oldRule>[^.]*).md"\}/gu,
  //   path: './.README/README.md',
  // });

  await replaceInOrder({
    checkName: 'index import',
    newLine: `import ${camelCasedRuleName} from './rules/${camelCasedRuleName}';`,
    oldIsCamel: true,
    oldRegex: /\nimport (?<oldRule>[^ ]*) from '.\/rules\/\1';/gu,
    path: './src/index.js',
  });

  await replaceInOrder({
    checkName: 'index recommended',
    newLine: `${' '.repeat(6)}'jsdoc/${ruleName}': ${recommended ? 'warnOrError' : '\'off\''},`,
    oldRegex: /\n\s{6}'jsdoc\/(?<oldRule>[^']*)': .*?,/gu,
    path: './src/index.js',
  });

  await replaceInOrder({
    checkName: 'index rules',
    newLine: `${' '.repeat(4)}'${ruleName}': ${camelCasedRuleName},`,
    oldRegex: /\n\s{4}'(?<oldRule>[^']*)': [^,]*,/gu,
    path: './src/index.js',
  });

  await import('./generateDocs.js');

  /*
  console.log('Paths to open for further editing\n');
  console.log(`open ${ruleReadmePath}`);
  console.log(`open ${rulePath}`);
  console.log(`open ${ruleTestPath}\n`);
  */

  // Set chdir as somehow still in operation from other test
  process.chdir(resolve(__dirname, '../../'));
  await open([
    // Could even add editor line column numbers like `${rulePath}:1:1`
    ruleReadmePath,
    ruleTestPath,
    rulePath,
  ]);
})();
