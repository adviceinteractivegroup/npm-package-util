'use strict';
const sorensen = require('./sorensen');
const _ = require('lodash');

const removeMeta = (obj) =>{
  for(let prop in obj) {
    if (prop === '$meta') {
      delete obj[prop];
    } else if (typeof obj[prop] === 'object') {
      removeMeta(obj[prop]);
    }
  }
};

const getAddressScore = (addr1, addr2) => {
  let score = 0;
  let segments = 0;
  if(addr1.hide === true) {
    let postalCode = _.get(addr1.hideRules, 'postal_code', true);
    let state = _.get(addr1.hideRules, 'state', true);
    let city = _.get(addr1.hideRules, 'city', true);
    segments += postalCode ? 1 : 0;
    segments += state ? 1 : 0;
    segments += city ? 1 : 0;
    score += addr1.zipcode === addr2.zipcode && postalCode ? 1 : 0;
    score += addr1.state === addr2.state && state ? 1 : 0;
    score += city && addr1.city && addr2.city ? sorensen(addr1.city, addr2.city) : 0;
    //penalizing results with street address if hide address this way we gime more weight to hidden ones 
    score -= addr2.hasOwnProperty('street_address1') && !!addr2.street_address1 ? 0.01 : 0;
    return score / (segments ? segments : 1);
  }
  removeMeta(addr1.hideRules);
  delete addr1.hideRules;
  delete addr1.hide;
  Object.keys(addr1).forEach((x) => {
    segments += addr1[x] !== null ? 1 : 0;
  });
  for (const key1 of Object.keys(addr1)) {
    for (const key2 of Object.keys(addr2)) {
      /* istanbul ignore next */
      if(key1 === key2 && addr1[key1] === addr2[key2]
        && key2 !== 'street_address1' && key2 !== 'city'
        && addr1[key1] !== null) {
        ++score;
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
  return score / (segments ? segments : 1);
};

exports = module.exports = {
  getAddressScore
};
