'use strict';
const sorensen = require('./sorensen');
const getAddrScore = (addr1, addr2) => {
  let addr1Segments = 0;
  Object.keys(addr1).forEach((x) => {
    if(addr1[x] !== '' && addr1[x] !== null) {
      ++addr1Segments;
    }
  });
  let score = 0;
  for (const key1 of Object.keys(addr1)) {
    for (const key2 of Object.keys(addr2)) {
      /* istanbul ignore next */
      if(key1 === key2 && addr1[key1] === addr2[key2] 
      && key2 !== 'street_address1' && addr1[key1] !== '' && addr1[key1] !== null) {
        score++;
        break;
      /* istanbul ignore next */
      } else if (key1 === key2 && key2 === 'street_address1'
      && addr1[key1] !== '' && addr1[key1] !== null ) {
        score = sorensen(addr1[key1], addr2[key2]);
      } else if (key1 === key2) {
        break;
      }
    }
  }
  score /= addr1Segments;
  return score;
};

exports = module.exports = {
  getAddrScore
};
