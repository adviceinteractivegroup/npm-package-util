'use strict';

const legacyClientToClient = function legacyClientToClient(data) {
  if (data && data.name) {
    data.businessName = data.name;
    data.city = data.city;
    data.state = data.state;
    data.street1 = data.street;
    data.street2 = data.suite ? data.suite : '';
    delete data.name;
    delete data.suite;
    delete data.street;

    return data;
  } else if(data && data.businessName) {
    return data;
  }
};

exports = module.exports = {
  legacyClientToClient
};
