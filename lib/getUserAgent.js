'use strict';

const randomUA = require('random-fake-useragent');

exports = module.exports = (browserType = '') => {
  return randomUA.getRandom(browserType);
};
