'use strict';

const general = require('./lib/general');
exports = module.exports = {
  normalize: require('./lib/normalize'),
  verifyNapGp: require('./lib/verifynapgp'),
  isNumeric: general.isNumeric,
  isURL: general.isURL,
  getDirectories: require('./lib/getdirectories')
};
