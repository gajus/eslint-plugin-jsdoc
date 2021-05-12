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
    licensePattern = '/([^\n]*)/gu',
  } = options;

  utils.forEachPreferredTag('version', (jsdocParameter, targetTagName) => {
    const version = utils.getTagDescription(jsdocParameter).trim();
    if (!version) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (!semver.valid(version)) {
      report(
        `Invalid JSDoc @${targetTagName}: "${utils.getTagDescription(jsdocParameter)}".`,
        null,
        jsdocParameter,
      );
    }
  });
  utils.forEachPreferredTag('variation', (jsdocParameter, targetTagName) => {
    const variation = utils.getTagDescription(jsdocParameter).trim();
    if (!variation) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (
      !Number.isInteger(Number(variation)) ||
      Number(variation) <= 0
    ) {
      report(
        `Invalid JSDoc @${targetTagName}: "${utils.getTagDescription(jsdocParameter)}".`,
        null,
        jsdocParameter,
      );
    }
  });
  utils.forEachPreferredTag('since', (jsdocParameter, targetTagName) => {
    const version = utils.getTagDescription(jsdocParameter).trim();
    if (!version) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (!semver.valid(version)) {
      report(
        `Invalid JSDoc @${targetTagName}: "${utils.getTagDescription(jsdocParameter)}".`,
        null,
        jsdocParameter,
      );
    }
  });
  utils.forEachPreferredTag('license', (jsdocParameter, targetTagName) => {
    const licenseRegex = utils.getRegexFromString(licensePattern, 'g');
    const match = utils.getTagDescription(jsdocParameter).match(licenseRegex);
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
    const author = utils.getTagDescription(jsdocParameter).trim();
    if (!author) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (allowedAuthors && !allowedAuthors.includes(author)) {
      report(
        `Invalid JSDoc @${targetTagName}: "${utils.getTagDescription(jsdocParameter)}"; expected one of ${allowedAuthors.join(', ')}.`,
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
