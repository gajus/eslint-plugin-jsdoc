import index from '../index.js';
import {
  compile,
} from 'json-schema-to-typescript';
import {
  writeFile,
} from 'node:fs/promises';

let str = 'export interface Rules {\n';

for (const [
  ruleName,
  rule,
] of Object.entries(
  /** @type {Record<string, import('@eslint/core').RuleDefinition<import('@eslint/core').RuleDefinitionTypeOptions>>} */ (
      index.rules
    ),
  )
) {
  str += `  /** ${rule.meta?.docs?.description ?? ''} */\n`;
  str += `  "jsdoc/${ruleName}": `;
  const ts = await compile({
    items: rule?.meta?.schema || [],
    type: 'array',
  }, 'Test', {
    bannerComment: '',
  });

  str += ts
    .replace(/^export type Test = ?/v, '')
    .replace(/^export interface Test /v, '')
    .replaceAll('\n', '\n  ').trimEnd().replace(/;$/v, '') +
      ';\n\n';
}

str = str.replace(/\n$/v, '') + '}\n';

await writeFile(import.meta.dirname + '/../rules.d.ts', str);

// console.log('str', str);
