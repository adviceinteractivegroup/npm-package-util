'use strict';

const removeSomeCharacters = function removeSomeCharacters(text, char) {
  text = text.replace(/ |%|20|26/g, char);
  return text;
};

exports = module.exports = {
  removeSomeCharacters: removeSomeCharacters
};
