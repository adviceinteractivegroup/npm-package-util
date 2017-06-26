'use strict';

// converts the phone number into a string and returns the last 10 digits
const normalizePhone = function normalizePhone(phone) {
  return decodeURIComponent(phone).getNumbers().slice(-10);
};

exports = module.exports = {
  normalizePhone
};
