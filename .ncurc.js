'use strict';

module.exports = {
  reject: [
    // Todo: When package converted to ESM
    'camelcase',
    'decamelize',
    'escape-string-regexp',
    'open-editor',

    // Todo[engine:node@>=16]: Requires Node 16
    'eslint-config-canonical',
  ],
};
