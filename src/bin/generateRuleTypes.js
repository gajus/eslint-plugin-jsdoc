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
] of Object.entries(index.rules)) {
  str += `  /** ${rule.meta.docs.description} */\n`;
  str += `  "jsdoc/${ruleName}": `;
  const ts = await compile({
    items: rule.meta.schema ?? [],
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

// eslint-disable-next-line no-console -- Todo
console.log('str', str);
