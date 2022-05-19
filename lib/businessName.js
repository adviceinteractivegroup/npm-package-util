'use strict';

const filterStopWords = business_name => {
  return business_name
  .replace(/(\b)(dmd|llc|co|ltd|inc|llcs|llp|llps|and)(\b)/gi, '$1$3')
  .replace(/[&#]/g, ' ')
  .replace(/\s+/g, ' ')
  .trim();
};

exports = module.exports = {
  filterStopWords
};
