'use strict';

module.exports = {
  // Whitelist all for checking besides `peer` which indicates
  //   somewhat older versions of `eslint` we still support even
  //   while our devDeps point to a more recent version
  dep: 'prod,dev,optional,bundle',
  reject: [
    // Todo[engine:node@>=10.0.0]: 7.0.0 of semver has minimum of Node 10
    'semver'
  ]
};
