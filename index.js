'use strict';

const {isNumeric, isURL, grep} = require('./lib/general');
const {filterStopWords} = require('./lib/businessName');
const {getAbreviatedState, normalizeSuite, normalizeCompass} = require('./lib/address');
const {normalizePhone} = require('./lib/phone');
const removeSomeCharacters = require('./lib/removeSomeCharacters');
exports = module.exports = {
  normalize: require('./lib/normalize'),
  verifyNapGp: require('./lib/verifynapgp'),
  filterStopWords,
  getAbreviatedState,
  normalizePhone,
  normalizeSuite,
  normalizeCompass,
  isNumeric,
  isURL,
  grep,
  getDirectories: require('./lib/getdirectories'),
  sorensen: require('./lib/sorensen'),
  levenshtein: require('./lib/levenshtein'),
  removeSomeCharacters: removeSomeCharacters,
  getProxy: require('./lib/getProxy'),
  stringExtensions: require('./lib/stringExtensions')
};
