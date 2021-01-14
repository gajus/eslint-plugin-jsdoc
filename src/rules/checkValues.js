import semver from 'semver';
import spdxExpressionParse from 'spdx-expression-parse';
import iterateJsdoc from '../iterateJsdoc';

export default iterateJsdoc(({
  utils,
  report,
  context,
}) => {
  const options = context.options[0] || {};
  const {
    allowedLicenses = null,
    allowedAuthors = null,
    licensePattern = '([^\n]*)',
  } = options;

  utils.forEachPreferredTag('version', (jsdocParameter, targetTagName) => {
    const version = jsdocParameter.description.trim();
    if (!version) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (!semver.valid(version)) {
      report(
        `Invalid JSDoc @${targetTagName}: "${jsdocParameter.description}".`,
        null,
        jsdocParameter,
      );
    }
  });
  utils.forEachPreferredTag('since', (jsdocParameter, targetTagName) => {
    const version = jsdocParameter.description.trim();
    if (!version) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (!semver.valid(version)) {
      report(
        `Invalid JSDoc @${targetTagName}: "${jsdocParameter.description}".`,
        null,
        jsdocParameter,
      );
    }
  });
  utils.forEachPreferredTag('license', (jsdocParameter, targetTagName) => {
    const licenseRegex = new RegExp(licensePattern, 'g');
    const match = jsdocParameter.description.match(licenseRegex);
    const license = match && match[1] || match[0];
    if (!license.trim()) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (allowedLicenses) {
      if (allowedLicenses !== true && !allowedLicenses.includes(license)) {
        report(
          `Invalid JSDoc @${targetTagName}: "${license}"; expected one of ${allowedLicenses.join(', ')}.`,
          null,
          jsdocParameter,
        );
      }
    } else {
      try {
        spdxExpressionParse(license);
      } catch {
        report(
          `Invalid JSDoc @${targetTagName}: "${license}"; expected SPDX expression: https://spdx.org/licenses/.`,
          null,
          jsdocParameter,
        );
      }
    }
  });

  utils.forEachPreferredTag('author', (jsdocParameter, targetTagName) => {
    const author = jsdocParameter.description.trim();
    if (!author) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (allowedAuthors && !allowedAuthors.includes(author)) {
      report(
        `Invalid JSDoc @${targetTagName}: "${jsdocParameter.description}"; expected one of ${allowedAuthors.join(', ')}.`,
        null,
        jsdocParameter,
      );
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
    docs: {
      description: 'This rule checks the values for a handful of tags: `@version`, `@since`, `@license` and `@author`.',
      url: 'https://github.com/gajus/eslint-plugin-jsdoc#eslint-plugin-jsdoc-rules-check-values',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          allowedAuthors: {
            items: {
              type: 'string',
            },
            type: 'array',
          },
          allowedLicenses: {
            anyOf: [
              {
                items: {
                  type: 'string',
                },
                type: 'array',
              },
              {
                type: 'boolean',
              },
            ],
          },
          licensePattern: {
            type: 'string',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
