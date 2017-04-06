'use strict';
const isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isURL = function isURL(str) {
  let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex .test(str);
};

exports = module.exports = {
  isNumeric: isNumeric,
  isURL: isURL
};
