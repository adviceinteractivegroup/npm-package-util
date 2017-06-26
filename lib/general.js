'use strict';
const isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const isURL = function isURL(str) {
  let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex.test(str);
};

// filter an array to return only the items that satisfy the condition
const grep = (items, cb) => {
  let results = [];
  for (let len = items.length, i = 0; i < len; i++) {
    let item = items[i];
    let cond = cb(item);
    if (cond) {
      results.push(item);
    }
  }
  return results;
};

exports = module.exports = {
  isNumeric: isNumeric,
  isURL: isURL,
  grep: grep
};
