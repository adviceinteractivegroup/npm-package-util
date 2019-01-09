'use strict';
const sorensen = require('./sorensen');
const getAddressScore = (addr1, addr2) => {
  let hide = addr1.hide;
  let addr1Segments = 0;
  Object.keys(addr1).forEach((x) => {
    if(addr1[x] !== null) {
      ++addr1Segments;
    }
  });
  let score = 0;
  for (const key1 of Object.keys(addr1)) {
    for (const key2 of Object.keys(addr2)) {
      /* istanbul ignore next */
      if(key1 === key2 && addr1[key1] === addr2[key2]
        && key2 !== 'street_address1' && key2 !== 'city'
        && addr1[key1] !== null) {
        score++;
        break;
      /* istanbul ignore next */
      } else if (key1 === key2
        && (key2 === 'street_address1' || key2 === 'city')
        && addr1[key1] !== null && addr2[key2] !== null ) {
        score += sorensen(addr1[key1], addr2[key2]);
      } else if (key1 === key2) {
        break;
      }
    }
  }
  if (addr1Segments > 0 ) {
    score /= addr1Segments;
  }
  if(!!addr1.hide && addr1.hide === true) {
    score = 0;
    if(addr1.zipcode === addr2.zipcode) {
      score += 1;
    }
    if(addr1.state === addr2.state) {
      score += 1;
    }
    if(addr1.state === addr2.state) {
      score += 1;
    }
    if(addr2.hasOwnProperty('street_address1') && addr2.street_address1 !== null) {
      score -= 1;
    }
    score = score / 3;
  }
  return score;
};

exports = module.exports = {
  getAddressScore
};
