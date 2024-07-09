'use strict';

module.exports = {
  reject: [
    // Todo: When package converted to ESM
    'camelcase',
    'chai',
    'decamelize',
    'escape-string-regexp',
    'open-editor',

    // todo[engine:node@>=20]: Can reenable
    'glob',
    // todo[engine:node@>=20]: Can reenable
    'rimraf'
  ],
};
