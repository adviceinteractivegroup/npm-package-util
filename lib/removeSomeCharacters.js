'use strict';

const removeSomeCharacters = function removeSomeCharacters(text) {
  text = text.replace(/ |%|20|26/g, '+');
  return text;
};

exports = module.exports = {
  removeSomeCharacters: removeSomeCharacters
};
