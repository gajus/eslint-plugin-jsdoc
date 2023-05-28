import {
  generate,
} from '@es-joy/escodegen';
import decamelize from 'decamelize';
import {
  parse,
} from 'espree';
import esquery from 'esquery';
import {
  readdir,
  readFile,
  writeFile,
} from 'fs/promises';
import {
  join,
} from 'path';

const rulesDir = './src/rules';

const dirContents = await readdir(rulesDir);

for (const file of dirContents) {
  if (!file.endsWith('.js')) {
    continue;
  }

  const fileContents = await readFile(join(rulesDir, file), 'utf8');
  // console.log('file', file);
  const ast = parse(fileContents, {
    ecmaVersion: 2_022,
    sourceType: 'module',
  });
  const results = esquery.query(
    ast,
    'ExportDefaultDeclaration[declaration.callee.name="iterateJsdoc"]' +
     ' Property[key.name="meta"] Property[key.name="schema"]',
  );
  if (results[0]?.value) {
    const schema = generate(results[0]?.value);

    // eslint-disable-next-line no-eval -- Need some parser
    const json = eval('JSON.stringify(' + schema + ', null, 2)');
    const parsed = JSON.parse(json);

    let initial = '';
    if (Array.isArray(parsed)) {
      if (!parsed.length) {
        // eslint-disable-next-line no-console -- CLI
        console.log('skipping no options', file);
        continue;
      }

      if (parsed.length >= 2) {
        if (parsed.length >= 3 || parsed[0].type !== 'string') {
          // eslint-disable-next-line no-console -- CLI
          console.log('unexpectedly large schema', file);
          continue;
          // throw new Error('Unexpected long schema array');
        }

        initial = `string (${parsed[0].enum.map((item) => {
          return `"${item}"`;
        }).join(', ')}) followed by object with `;
        parsed.shift();
      }
    }

    const obj = Array.isArray(parsed) ? parsed[0] : parsed;

    const hyphenatedRule = decamelize(file, {
      separator: '-',
    }).replace(/\.js$/u, '.md');
    const docPath = join('.README/rules', hyphenatedRule);

    const ruleDocs = (await readFile(docPath, 'utf8'))
      .replace(/(\|\s*Options\s*\|)([^|]*)(\|)?/u, `$1${
        initial +
        Object.keys(obj.properties).map((key) => {
          return `\`${key}\``;
        }).join(', ')
      }$3`);

    await writeFile(docPath, ruleDocs);
  }
}
