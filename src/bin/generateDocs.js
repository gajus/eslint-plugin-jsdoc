import plugin from '../index.js';
import decamelize from 'decamelize';
import fs from 'fs';
import Gitdown from 'gitdown';
import {
  glob,
} from 'glob';
/**
 * This script is used to inline assertions into the README.md documents.
 */
import path from 'path';

const dirname = import.meta.dirname;

/**
 * @param {string} str
 */
const escapeDescription = (str) => {
  return str.replaceAll(/(?<!`|\* +|'|\/\/ )@\w+/gv, '<code>$&</code>');
};

/**
 * @param {string} code
 * @returns {string}
 */
const trimCode = (code) => {
  let lines = code.replace(/^\n/v, '').trimEnd().split('\n');

  const firsLineIndentation = lines[0].match(/^\s+/v);
  const lastLineIndentation = lines[lines.length - 1].match(/^\s+/v);

  const firstIndentSize = firsLineIndentation ? firsLineIndentation[0].length : 0;
  const lastIndentSize = lastLineIndentation ? lastLineIndentation[0].length : 0;

  lines = lines.map((line, index) => {
    const lineIndentSize = firstIndentSize !== 0 || index === 0 ?
      Math.min(firstIndentSize, lastIndentSize) :
      lastIndentSize;

    return line.slice(lineIndentSize);
  });

  return lines.join('\n').replaceAll('\r', '\\r');
};

/**
 * @param {import('eslint').RuleTester.InvalidTestCase|import('eslint').RuleTester.ValidTestCase} setup
 * @param {string} ruleName
 * @returns {string}
 */
const formatCodeSnippet = (setup, ruleName) => {
  const paragraphs = [];

  paragraphs.push(trimCode(setup.code));

  if (setup.settings) {
    paragraphs.push(`// Settings: ${JSON.stringify(setup.settings)}`);
  }

  if (setup.options) {
    paragraphs.push(`// "jsdoc/${ruleName}": ["error"|"warn", ${JSON.stringify(setup.options).slice(1)}`);
  }

  if ('errors' in setup) {
    paragraphs.push(`// Message: ${
      /** @type {Array<import('eslint').RuleTester.TestCaseError>} */ (
        setup.errors
      )[0].message}`);
  }

  return paragraphs.join('\n');
};

const getAssertions = async () => {
  const assertionFiles = (await glob(path.resolve(dirname, '../../test/rules/assertions/*.js'))).filter((file) => {
    return !file.includes('flatConfig');
  }).toReversed();

  const assertionNames = assertionFiles.map((filePath) => {
    return path.basename(filePath, '.js');
  });

  const assertionCodes = await Promise.all(assertionFiles.map(async (filePath, idx) => {
    /**
     * @type {{
     *   invalid: (import('eslint').RuleTester.InvalidTestCase & {ignoreReadme?: true})[],
     *   valid: (import('eslint').RuleTester.ValidTestCase & {ignoreReadme?: true})[]
     * }}
     */
    const codes = (await import(filePath)).default;

    const ruleName = decamelize(assertionNames[idx], {
      separator: '-',
    });

    return {
      invalid: codes.invalid.filter(({
        ignoreReadme,
      }) => {
        return !ignoreReadme;
      }).map((setup) => {
        return formatCodeSnippet(setup, ruleName);
      }),
      valid: codes.valid.filter(({
        ignoreReadme,
      }) => {
        return !ignoreReadme;
      }).map((setup) => {
        return formatCodeSnippet(setup, ruleName);
      }),
    };
  }));

  return {
    assertionNames,
    assertions: Object.fromEntries(assertionNames.map((assertionName, index) => {
      return [
        assertionName, assertionCodes[index],
      ];
    })),
  };
};

const getSomeBranch = () => {
  const gitConfig = fs.readFileSync(path.join(dirname, '../../.git/config')).toString();
  const [
    , branch,
  ] = /\[branch "([^"]+)"\]/v.exec(gitConfig) || [];

  return branch;
};

// Scan the directory for these instead?
const extraFiles = [
  'settings.md',
  'advanced.md',
  'processors.md',
  'README.md',
];

const otherPaths = extraFiles.map((extraFile) => {
  return path.join(dirname, '..', '..', '.README', extraFile);
});

const generateDocs = async () => {
  const {
    assertionNames,
    assertions,
  } = await getAssertions();

  /** @type {import('json-schema').JSONSchema4[][]} */
  const schemas = [];

  /**
   * @type {{
   *   decamelized: string,
   *   row: string
   * }[]}
   */
  const tableRows = [];

  const docContents = await Promise.all([
    ...assertionNames.map((assertionName) => {
      const decamelized = decamelize(assertionName, {
        separator: '-',
      });
      schemas.push(
        /** @type {import('json-schema').JSONSchema4[]} */
        (plugin.rules?.[decamelized].meta?.schema),
      );
      const ruleDescription = plugin.rules?.[decamelized]?.meta?.docs?.description;
      if (!ruleDescription) {
        throw new Error(`Rule ${assertionName} missing description`);
      }

      const fixable = plugin.rules?.[decamelized]?.meta?.fixable ?? null;

      const recommended = plugin.configs['flat/recommended'].rules?.['jsdoc/' + decamelized] !== 'off';
      const tsRecommended = plugin.configs['flat/recommended-typescript'].rules?.['jsdoc/' + decamelized] !== 'off';
      const tsRecommendedFlavor = plugin.configs['flat/recommended-typescript-flavor'].rules?.['jsdoc/' + decamelized] !== 'off';

      tableRows.push({
        decamelized,
        row: `|${
          recommended ?
            (tsRecommended && tsRecommendedFlavor ?
              ':heavy_check_mark:' :
              ':heavy_check_mark: (' + (tsRecommended ? 'On in TS' : 'Off in TS') +
                '; ' +
                (tsRecommendedFlavor ? 'On in TS flavor' : 'Off in TS flavor') +
                ')'
            ) :
            (tsRecommended || tsRecommendedFlavor ?
              (tsRecommended ? 'On in TS' : 'Off in TS') +
                '; ' +
                (tsRecommendedFlavor ? 'On in TS flavor' : 'Off in TS flavor') :
              '')
        }|${fixable ? ':wrench:' : ''}| [${decamelized}](./docs/rules/${decamelized}.md#readme) | ${ruleDescription} |`,
      });

      return path.join(
        dirname, '..', '..', '.README', 'rules', decamelized + '.md',
      );
    }),
    ...otherPaths,
  ].map(async (docPath, idx) => {
    const gitdown = await Gitdown.readFile(docPath);

    gitdown.setConfig({
      gitinfo: {
        defaultBranchName: getSomeBranch() || 'master',
        gitPath: path.join(dirname, '../../.git'),
      },
    });

    gitdown.registerHelper('rules-table', {
      compile () {
        return tableRows.toSorted(({
          decamelized,
        }, {
          decamelized: dc,
        }) => {
          return decamelized < dc ? -1 : (decamelized > dc ? 1 : 0);
        }).map(({
          row,
        }) => {
          return row;
        }).join('\n');
      },
    });

    gitdown.registerHelper('options', {
      compile () {
        if (!schemas[idx]) {
          return '';
        }

        /**
         * @param {import('json-schema').JSONSchema4} schema
         * @param {number} jIdx
         * @param {import('json-schema').JSONSchema4[]} arr
         * @param {number} [nesting]
         */
        const convertFromSchema = (schema, jIdx, arr, nesting = 3) => {
          let ret = '';
          switch (schema.type) {
            case 'array':
              ret += convertFromSchema(
                /** @type {import('json-schema').JSONSchema4} */ (schema.items),
                0,
                [],
                nesting + 1,
              );
              break;
            case 'object':
              if (!schema.properties) {
                break;
              }

              if (jIdx === 0) {
                ret += (arr.length <= 1 ? 'A single' : 'An') +
                ' options object has the following properties.\n\n';
              } else {
                ret += '\n\nThe next option is an object with the following properties.\n\n';
              }

              if (schema.description) {
                ret += `${escapeDescription(schema.description)}\n`;
              }

              for (const [
                property,
                innerSchema,
              ] of Object.entries(schema.properties)) {
                const {
                  description,
                  type,
                } = innerSchema;
                if (!description) {
                  throw new Error(
                    'Missing description for property ' + property + ' for rule ' + assertionNames[idx] + ' with schema ' + JSON.stringify(innerSchema),
                  );
                }

                ret += '#'.repeat(nesting) + ` \`${property}\`

${type === 'object' && innerSchema.properties ? '' : escapeDescription(description)}
`;
                if (type === 'object' || type === 'array') {
                  ret += convertFromSchema(innerSchema, 0, [], nesting + 1);
                }
              }

              break;
            case 'string':
              if (jIdx !== 0) {
                throw new Error('Unexpected string schema');
              }

              // If a simple string, should be documented by parent
              if (schema.enum) {
                ret += 'The first option is a string with the following possible values: ';
                ret += schema.enum?.map((val) => {
                  return `"${val}"`;
                }).join(', ') + '.\n';
              }

              if (schema.description) {
                ret += escapeDescription(schema.description);
              }

              break;
            default:
              // Describe on parent object
              if (schema.anyOf) {
                break;
              }

              throw new Error('Unrecognized type ' + schema.type + ' for schema: ' +
                JSON.stringify(schema));
          }

          return ret;
        };

        return schemas[idx].map((schema, jIdx, arr) => {
          return convertFromSchema(schema, jIdx, arr);
        }).join('');
      },
    });

    return gitdown.get();
  }));

  return docContents.map((docContent) => {
    return docContent.replaceAll(
      /<!-- assertions-(passing|failing) ([a-z]+?) -->/gvi,
      /**
       * @param {string} _assertionsBlock
       * @param {string} passingFailing
       * @param {string} ruleName
       * @returns {string}
       */
      (_assertionsBlock, passingFailing, ruleName) => {
        const ruleAssertions = assertions[ruleName];

        if (!ruleAssertions) {
          throw new Error(`No assertions available for rule "${ruleName}".`);
        }

        return passingFailing === 'failing' ?
          'The following patterns are considered problems:\n\n````ts\n' +
            ruleAssertions.invalid.join('\n\n') + '\n````\n\n' :
          'The following patterns are not considered problems:\n\n````ts\n' +
            ruleAssertions.valid.join('\n\n') + '\n````\n';
      },
    // Allow relative paths in source for #902 but generate compiled file in
    //   manner compatible with GitHub and npmjs.com
    ).replaceAll('(../#', '(#user-content-eslint-plugin-jsdoc-');
  });
};

/**
 * @returns {string[]}
 */
const getDocPaths = () => {
  const basePath = path.join(dirname, '..', '..', '.README');
  const writeBasePath = path.join(dirname, '..', '..', 'docs');
  const docPaths = /** @type {string[]} */ (fs.readdirSync(basePath).flatMap((docFile) => {
    if (extraFiles.includes(docFile)) {
      // Will get path separately below
      return null;
    }

    if (docFile === '.DS_Store') {
      return null;
    }

    const innerBasePath = path.join(basePath, docFile);
    const writeInnerBasePath = path.join(writeBasePath, docFile);
    const stat = fs.statSync(innerBasePath);
    if (stat.isFile()) {
      // Currently settings and advanced
      return writeInnerBasePath;
    }

    if (stat.isDirectory()) {
      return fs.readdirSync(innerBasePath).map((innerDocFile) => {
        return path.join(writeInnerBasePath, innerDocFile);
      }).sort((a, b) => {
        const newA = a.replace(/\.md/v, '');
        const newB = b.replace(/\.md/v, '');
        return newA < newB ? -1 : (newB > newA ? 1 : 0);
      });
    }

    return null;
  }).filter(Boolean));

  return [
    ...docPaths,
    ...extraFiles.slice(0, -1).map((extraFile) => {
      return path.join(dirname, '..', '..', 'docs', extraFile);
    }),
    path.join(dirname, '..', '..', 'README.md'),
  ];
};

const generateDocsAndWriteToDisk = async () => {
  const [
    docContents,
    docPaths,
  ] = await Promise.all([
    generateDocs(), getDocPaths(),
  ]);
  for (const [
    idx,
    docContent,
  ] of docContents.entries()) {
    const destPath = docPaths[idx];
    fs.writeFileSync(destPath, docContent);
  }
};

const assertDocsAreUpToDate = async () => {
  const [
    docContents,
    docPaths,
  ] = await Promise.all([
    generateDocs(), getDocPaths(),
  ]);
  for (const [
    idx,
    docContent,
  ] of docContents.entries()) {
    const docPath = docPaths[idx];
    const isUpToDate = fs.readFileSync(docPath, 'utf8') === docContent;

    if (!isUpToDate) {
      throw new Error('Docs are not up to date, please run `pnpm run create-docs` to update it.');
    }
  }
};

const main = async () => {
  try {
    const hasCheckFlag = process.argv.includes('--check');

    if (hasCheckFlag) {
      await assertDocsAreUpToDate();
    } else {
      await generateDocsAndWriteToDisk();
    }
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.error(error);

    process.exit(1);
  }
};

main();

export default generateDocs;
