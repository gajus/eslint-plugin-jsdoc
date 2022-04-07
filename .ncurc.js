'use strict';

module.exports = {
  // Whitelist all for checking besides `peer` which indicates
  //   somewhat older versions of `eslint` we still support even
  //   while our devDeps point to a more recent version
  dep: 'prod,dev,optional,bundle',
  reject: [
    // Todo: When package converted to ESM
    'decamelize',
    'escape-string-regexp',
    'open-editor',

    // Todo[engine:node@>=16]: Requires Node 16
    'eslint-config-canonical',
  ],
};
