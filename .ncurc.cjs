'use strict';

module.exports = {
  reject: [
    // Todo: When package converted to ESM only
    'escape-string-regexp',

    // todo[engine:node@>=20]: Can reenable
    'glob',
    // todo[engine:node@>=20]: Can reenable
    'rimraf'
  ],
};
