'use strict';

const {getAbreviatedState, normalizeSuite, normalizeCompass, normalizeStreetType, getAbreviatedStateChain} = require('../lib/address');
const sorensen = require('../lib/sorensen');
const {grep} = require('../lib/general');
const parser = require('parse-address');
const addressit = require('addressit');
const postal = require('node-postal');
const parseAddress = require('parse-address-string')

const completeSpaces = data => {
  // console.log('entro', data);
  if (data && data.bussines && data.directory ) {
    // console.log('entro', data.directory);
    // console.log('bussines', data.bussines);
    // console.log('directory', data.directory);
    let bussines = data.bussines.split(',');
    let directory = data.directory.split(',');
    // console.log('bussines length', bussines.length);
    // console.log('directory length', directory.length);
    if (bussines.length >= directory.length) {
      // console.log('num1', bussines[0].length);
      // for (const num of bussines[0].length) {
      let repeat = '¨'.repeat(bussines[0].length + 2);
      // console.log('num2', repeat + directory.join());
      return repeat + ' ' + directory.join();
      // }
    }
  }
};

const getAddressScore = data => {
  console.log(data.length);
  if (data.length > 0) {
    data.forEach(element => {
      // console.log('entro');
      let abrClientState = getAbreviatedState(element.state);
      let street = normalizeSuite(element.street1);
      let suite = element.street2 ? element.street2 : '';
      if(typeof suite === 'string' && suite !== '') {
        suite = normalizeSuite(suite.replace(/#/gi, ''));
        suite = suite.indexOf('#') === -1 ? ' #' + suite : ' ' + suite;
      }
      let parsedClientAddr = normalizeStreetType(normalizeCompass(normalizeSuite(
        `${street}${suite}, ${element.city}, ${abrClientState}, ${element.postal}`)));
      let parsedClientAddr2 = parser.parseLocation(normalizeStreetType(normalizeCompass(normalizeSuite(
        `${street}${suite}, ${element.city}, ${abrClientState}, ${element.postal}`))));

    //   //##################################################################################################
      let businessAddr2 = grep([element.street2, element.city, element.state, element.postal], Boolean).join(', ');
      // console.log('cosa1: ', businessAddr2);
      businessAddr2 = 
      // parser.
      //   parseLocation(
        normalizeStreetType(
        normalizeCompass(
        normalizeSuite(
        getAbreviatedState(businessAddr2)
        )
        )
        )
        // )
        ;
      // console.log('dir1: ', parsedClientAddr.decodeURLpart());
      // console.log('dir2: ', businessAddr2.decodeURLpart());
      // console.log('sorensen1:', sorensen(parsedClientAddr, businessAddr2));
      // let data = {bussines: parsedClientAddr, directory: businessAddr2};
      // console.log('dir4: ', completeSpaces({bussines: parsedClientAddr.decodeURLpart(), directory: businessAddr2.decodeURLpart()}));
      let newAddress = parser.parseLocation(completeSpaces({bussines: parsedClientAddr.decodeURLpart(), directory: businessAddr2.decodeURLpart()}));
      // console.log('newAddress', newAddress);
      // console.log({parsedClientAddr, newAddress});
      // console.log('dir3: ', parsedClientAddr.decodeURLpart());
      // console.log('dir4: ', newAddress);
      // console.log('sorensen2:', sorensen(parsedClientAddr.decodeURLpart(), newAddress.decodeURLpart()));
      // console.log('socre-parser:', 3 / Object.keys(parsedClientAddr2).length);
      console.log('######################################################################');
      // parse a made up address, with some slightly tricky parts 
      let address = addressit(businessAddr2.decodeURLpart());
      console.log('address1: ', address);
      let address2 = addressit(parsedClientAddr.decodeURLpart());
      console.log('address2: ', address2);

      // Parser API
      console.log('address3: ', postal.parser.parse_address(parsedClientAddr.decodeURLpart()));

      // parseAddress(parsedClientAddr.decodeURLpart(), function (err, addressObj) {
      //   console.log('Street: ', addressObj.street_address1);
      //   console.log('City: ', addressObj.city);
      //   console.log('State: ', addressObj.state);
      //   console.log('Zip: ', addressObj.postal_code);
      //   console.log('Country: ', addressObj.country);
      // });
    }); 
  }


  //##################################################################################################
  // let businessAddr2 = grep([data.street1, data.street2, data.city, data.state, data.postal], Boolean).join(', ');
  // businessAddr2 = normalizeSuite(getAbreviatedState(businessAddr2));
  // let parsedClientAddr2 = parser.parseLocation(normalizeStreetType(normalizeCompass(normalizeSuite(
  //   `${street2}${suite2}, ${data.city}, ${abrClientState2}, ${data.postal}`))));
  // console.log('address 1: ', businessAddr);
  // let parsedBusinessAdr = parser.parseLocation(
  //   normalizeStreetType(normalizeCompass(normalizeSuite(businessAddr))));

  // console.log('Address 3:', sorensen(parsedClientAddr, businessAddr2));
};


exports = module.exports = {
  getAddressScore,
  completeSpaces
};
