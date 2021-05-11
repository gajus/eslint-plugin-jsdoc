/* eslint-disable no-console -- CLI */
import fs from 'fs/promises';
import _ from 'lodash';

// Todo: Would ideally have prompts, e.g., to ask for whether type was problem/layout, etc.

const [, , ruleName] = process.argv;

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
  report,
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
        additionalProperies: false,
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

  const camelCasedRuleName = _.camelCase(ruleName);

  await fs.writeFile(`./src/rules/${camelCasedRuleName}.js`, ruleTemplate);

  const ruleTestTemplate = `export default {
  invalid: [
    {
      code: \`\`,
      errors: [{
        message: '',
      }],
    },
  ],
  valid: [
    {
      code: \`\`,
    },
  ],
};
`;

  await fs.writeFile(`./test/rules/assertions/${camelCasedRuleName}.js`, ruleTestTemplate);

  const ruleReadmeTemplate = `### \`${ruleName}\`

|||
|---|---|
|Context|everywhere|
|Tags|\`\`|
|Recommended|false|
|Settings||
|Options||

<!-- assertions ${camelCasedRuleName} -->
`;

  await fs.writeFile(`./.README/rules/${ruleName}.md`, ruleReadmeTemplate);

  const readmePath = './.README/README.md';

  const offsets = [];
  let readme = await fs.readFile(readmePath, 'utf8');

  const readmeNewRuleLine = `{"gitdown": "include", "file": "./rules/${ruleName}.md"}`;

  readme.replace(
    /\{"gitdown": "include", "file": ".\/rules\/(?<oldRule>[^.]*).md"\}/gu,
    (__, n1, offset, str, {oldRule}) => {
      offsets.push({
        offset,
        oldRule,
      });
    },
  );

  offsets.sort(({oldRule}, {oldRule: oldRuleB}) => {
    // eslint-disable-next-line no-extra-parens
    return oldRule < oldRuleB ? -1 : (oldRule > oldRuleB ? 1 : 0);
  });

  let alreadyIncluded = false;
  const item = offsets.find(({oldRule}) => {
    alreadyIncluded ||= ruleName === oldRule;

    return ruleName < oldRule;
  });
  if (alreadyIncluded) {
    console.log('Rule name is already present in README.');

    return;
  }
  if (item) {
    readme = readme.slice(0, item.offset) + readmeNewRuleLine + '\n' + readme.slice(item.offset);
  } else {
    readme += `${readmeNewRuleLine}\n`;
  }

  await fs.writeFile(readmePath, readme);

  await import('./generateReadme.js');
})();
