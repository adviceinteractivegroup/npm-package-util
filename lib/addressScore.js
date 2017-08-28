'use strict';

const {getAbreviatedState, normalizeSuite, normalizeCompass, normalizeStreetType} = require('../lib/address');
const parseAddress = require('parse-address-string');


const getAddrScore = (addr1, addr2) => {
  let addr1Segments = Object.keys(addr1).length;
  let score = 0;
  for (const key1 of Object.keys(addr1)) {
    for (const key2 of Object.keys(addr2)) {
      /* istanbul ignore next */
      if(key1 === key2 && addr1[key1] === addr2[key2]) {
        score++;
        break;
      /* istanbul ignore next */
      } else if (key1 === key2 ) {
        break;
      }
    }
  }
  score /= addr1Segments;
  return score;
};

const getParseAddress = data => {
  return new Promise((resolve) => { 
    let parsedClientAddr = normalizeStreetType(normalizeCompass(normalizeSuite(getAbreviatedState(data))));
    parseAddress(parsedClientAddr, function s(err, addressObj) {
      if (err) {
        return resolve(err);
      }
      return resolve(addressObj);
    });
  });
};

exports = module.exports = {
  getAddrScore,
  getParseAddress
};
