import semver from 'semver';
import spdxLicenseList from 'spdx-license-list/simple';
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
  } = options;

  utils.forEachPreferredTag('version', (jsdocParameter, targetTagName) => {
    const version = jsdocParameter.description;
    if (!version.trim()) {
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
    const version = jsdocParameter.description;
    if (!version.trim()) {
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
    const license = jsdocParameter.description;
    if (!license.trim()) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (allowedLicenses) {
      if (allowedLicenses !== true && !allowedLicenses.includes(license)) {
        report(
          `Invalid JSDoc @${targetTagName}: "${jsdocParameter.description}"; expected one of ${allowedLicenses.join(', ')}.`,
          null,
          jsdocParameter,
        );
      }
    } else if (!spdxLicenseList.has(license)) {
      report(
        `Invalid JSDoc @${targetTagName}: "${jsdocParameter.description}"; expected SPDX identifier: https://spdx.org/licenses/.`,
        null,
        jsdocParameter,
      );
    }
  });

  utils.forEachPreferredTag('author', (jsdocParameter, targetTagName) => {
    const author = jsdocParameter.description;
    if (!author.trim()) {
      report(
        `Missing JSDoc @${targetTagName}.`,
        null,
        jsdocParameter,
      );
    } else if (allowedAuthors) {
      if (!allowedAuthors.includes(author)) {
        report(
          `Invalid JSDoc @${targetTagName}: "${jsdocParameter.description}"; expected one of ${allowedAuthors.join(', ')}.`,
          null,
          jsdocParameter,
        );
      }
    }
  });
}, {
  iterateAllJsdocs: true,
  meta: {
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
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
});
