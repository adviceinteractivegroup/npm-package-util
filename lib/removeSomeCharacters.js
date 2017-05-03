'use strict';

const removeSomeCharactersForPlus = function removeSomeCharacters(text) {
  text = text.replace(/ |%|20|26/g, '+');
  return text;
};

const removeSomeCharactersForEmpty = function removeSomeCharacters(text) {
  text = text.replace(/%|20|26|\+/g, ' ');
  return text;
};

exports = module.exports = {
  removeSomeCharactersForPlus: removeSomeCharactersForPlus,
  removeSomeCharactersForEmpty: removeSomeCharactersForEmpty
};
