/* eslint-disable no-console -- CLI */

/**
 * @example
 *
 * ```shell
 * npm run create-rule my-new-rule -- --recommended
 * ```
 */

import {
  existsSync,
} from 'fs';
import fs from 'fs/promises';
import {
  resolve,
} from 'path';
import camelCase from 'camelcase';
import open from 'open-editor';

// Todo: Would ideally have prompts, e.g., to ask for whether type was problem/layout, etc.

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
  const ruleNames = JSON.parse(await fs.readFile(
    ruleNamesPath, 'utf8',
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
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-${ruleName}',
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

<!-- assertions ${camelCasedRuleName} -->
`;

  const ruleReadmePath = `./.README/rules/${ruleName}.md`;
  if (!existsSync(ruleReadmePath)) {
    await fs.writeFile(ruleReadmePath, ruleReadmeTemplate);
  }

  const replaceInOrder = async ({
    path,
    oldRegex,
    checkName,
    newLine,
    oldIsCamel,
  }) => {
    const offsets = [];

    let readme = await fs.readFile(path, 'utf8');
    readme.replace(
      oldRegex,
      (matchedLine, n1, offset, str, {
        oldRule,
      }) => {
        offsets.push({
          matchedLine,
          offset,
          oldRule,
        });
      },
    );

    offsets.sort(({
      oldRule,
    }, {
      oldRule: oldRuleB,
    }) => {
      // eslint-disable-next-line no-extra-parens
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
      item = offsets.pop();
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

  await replaceInOrder({
    checkName: 'README',
    newLine: `{"gitdown": "include", "file": "./rules/${ruleName}.md"}`,
    oldRegex: /\n\{"gitdown": "include", "file": ".\/rules\/(?<oldRule>[^.]*).md"\}/gu,
    path: './.README/README.md',
  });

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

  await import('./generateReadme.js');

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
