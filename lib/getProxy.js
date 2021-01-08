'use strict';
const request = require('request');
const Promise = require('bluebird');
const types = [
  'search-proxy',
  'search-bigg',
  'google-plus',
  'georanker',
  'google-places',
  'google-plus',
  'address-verification'
];

exports = module.exports = Promise.promisify((type, done) => {
  if(types.indexOf(type) === -1) {
    return done(`Invalid type ${type}`);
  }
  let url = `https://p.lssdev.com/resources/use?type=${type}`;
  request({url, json: true}, (error, response, proxy)=>{
    if(error) {
      console.log(error);
      return done(error);
    }
    if(response.statusCode === 200 &&
      proxy.status === 200 &&
      proxy.data &&
      proxy.data.type &&
      proxy.data.type === type &&
      proxy.data.data
    ) {
      return done(null, proxy.data.data);
    } else {
      return done(JSON.stringify({message: 'not handled error requesting proxy credentials'}));
    }
  });
});
