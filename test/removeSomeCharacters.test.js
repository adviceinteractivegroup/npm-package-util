'use strict';
const assert = require('chai').assert;
const removeSomeCharacters = require('../lib/removeSomeCharacters');

describe('Remove Some Characters', function removeSomeCharactersDescribe() {
  let text = 'Yellow%x26+Red Blue';
  it('removeSomeCharacters should return a text A clean text, without spaces of more, nor characters not allowed', function dataProcessingIt() {
    let result = removeSomeCharacters.removeSomeCharacters(text, '+');
    assert.isString(result);
    assert.equal(result, 'Yellow+x++Red+Blue');
  });
    it('removeSomeCharacters should return a text A clean text, without spaces of more, nor characters not allowed', function dataProcessingIt() {
    let result = removeSomeCharacters.removeSomeCharacters(text, ' ');
    assert.isString(result);
    assert.equal(result, 'Yellow x +Red Blue');
  });

  it('removeSomeCharacter should NOT return a text A clean text', function removeSomeCharacterErrIt() {
    let result = removeSomeCharacters.removeSomeCharacters(text);
    assert.isString(result);
    assert.equal(result.indexOf('%'), -1);
  });
});