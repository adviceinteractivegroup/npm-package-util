'use strict';

const {isNumeric, isURL, grep} = require('./lib/general');
const {filterStopWords} = require('./lib/businessName');
const {getAbreviatedState, normalizeSuite, normalizeCompass, normalizeStreetType} = require('./lib/address');
const {normalizePhone} = require('./lib/phone');
const removeSomeCharacters = require('./lib/removeSomeCharacters');
const {legacyClientToClient} = require('./lib/legacyClientToClient');
const {getUserAgent, getReferer} = require('./lib/browserHelpers');
const {getAddressScore, getParseAddress} = require('./lib/addressScore');
const {getPhoneScore} = require('./lib/phoneScore');

exports = module.exports = {
  normalize: require('./lib/normalize'),
  verifyNapGp: require('./lib/verifynapgp'),
  getDirectories: require('./lib/getdirectories'),
  sorensen: require('./lib/sorensen'),
  levenshtein: require('./lib/levenshtein'),
  getProxy: require('./lib/getProxy'),
  stringExtensions: require('./lib/stringExtensions'),
  filterStopWords,
  getAbreviatedState,
  normalizePhone,
  normalizeSuite,
  normalizeCompass,
  normalizeStreetType,
  isNumeric,
  isURL,
  grep,
  getUserAgent,
  getReferer,
  removeSomeCharacters,
  legacyClientToClient,
  getAddressScore,
  getPhoneScore,
  getParseAddress
};
