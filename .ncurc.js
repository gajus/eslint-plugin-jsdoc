'use strict';

module.exports = {
  // Whitelist all for checking besides `peer` which indicates
  //   somewhat older versions of `eslint` we still support even
  //   while our devDeps point to a more recent version
  dep: 'prod,dev,optional,bundle',
};
