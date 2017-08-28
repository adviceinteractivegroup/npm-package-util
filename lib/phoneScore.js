'use strict';

const {normalizePhone} = require('../lib/phone');


const getPhoneScore = (phone1, phone2) => {
  return normalizePhone(phone1) === normalizePhone(phone2) ? 1 : 0;
};

exports = module.exports = {
  getPhoneScore
};
