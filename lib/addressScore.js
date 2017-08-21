'use strict';
const {getAbreviatedState, normalizeSuite, normalizeCompass, normalizeStreetType} = require('../lib/address');
const {sorensen} = require('../lib/sorensen');
const addressTest = data => {
  let abrClientState = getAbreviatedState(data.state);
  let street = normalizeSuite(data.street1);
  let suite = data.street2 ? data.street2 : '';
  if(typeof suite === 'string' && suite !== '') {
    suite = normalizeSuite(suite.replace(/#/gi, ''));
    suite = suite.indexOf('#') === -1 ? ' #' + suite : ' ' + suite;
  }
  let parsedClientAddr = parser.parseLocation(normalizeStreetType(normalizeCompass(normalizeSuite(
    `${street}${suite}, ${data.city}, ${abrClientState}, ${data.postal}`))));


  //##################################################################################################
  let businessAddr2 = grep([data.street1, data.street2, data.city, data.state, data.postal], Boolean).join(', ');
  businessAddr2 = normalizeSuite(getAbreviatedState(businessAddr2));
  // let parsedClientAddr2 = parser.parseLocation(normalizeStreetType(normalizeCompass(normalizeSuite(
  //   `${street2}${suite2}, ${data.city}, ${abrClientState2}, ${data.postal}`))));
  // console.log('address 1: ', businessAddr);
  // let parsedBusinessAdr = parser.parseLocation(
  //   normalizeStreetType(normalizeCompass(normalizeSuite(businessAddr))));

  console.log('Address 3:', sorensen(parsedClientAddr, businessAddr2));
      
};

exports = module.exports = {
  addressTest
};