'use strict';

const legacyClientToClient = function legacyClientToClient(data) {
  if (data) {
    if(!data.city) {
      return {error: true, message: 'The Client City does not exist'};
    }
    if(!data.state) {
      return {error: true, message: 'The Client State does not exist'};
    }
    if(!data.street1) {
      return {error: true, message: 'The Client Street does not exist'};
    }
    if(data.name) {
      data.businessName = data.name;
      data.city = data.city;
      data.state = data.state;
      data.street1 = data.street;
      data.street2 = data.suite ? data.suite : '';
      data.phone = data.phone ? data.phone : '';
      delete data.name;
      delete data.suite;
      delete data.street;
      return data;
    } else if(data && data.businessName) {
      return data;
    }
  } else {
    return {error: true, message: 'data not found'};
  }
};

exports = module.exports = {
  legacyClientToClient
};
