'use strict';

const cleanText = function cleanText(text) {
  text = text.replace(/ |%|20|26/g, '+');
  return text;
};

exports = module.exports = {
  cleanText: cleanText
};
