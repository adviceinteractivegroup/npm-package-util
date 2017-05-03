'use strict';

const general = require('./lib/general');
const removeSomeCharacters = require('./lib/removeSomeCharacters');
exports = module.exports = {
  normalize: require('./lib/normalize'),
  verifyNapGp: require('./lib/verifynapgp'),
  isNumeric: general.isNumeric,
  isURL: general.isURL,
  getDirectories: require('./lib/getdirectories'),
  sorensen: require('./lib/sorensen'),
  levenshtein: require('./lib/levenshtein'),
  removeSomeCharacters: removeSomeCharacters
};
