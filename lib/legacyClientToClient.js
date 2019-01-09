'use strict';

const legacyClientToClient = function legacyClientToClient(data) {
  if (data && data.name) {
    data.businessName = data.name;
    data.street1 = data.street;
    data.street2 = data.suite;
    data.postal = data.zipcode;
    data.hide = data.hide && data.hide === 'true' ? true : false;
    delete data.name;
    delete data.suite;
    delete data.street;
    return data;
  } else {
    return data;
  }
};

exports = module.exports = {
  legacyClientToClient: legacyClientToClient
};
