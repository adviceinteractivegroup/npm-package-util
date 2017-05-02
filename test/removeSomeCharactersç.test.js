'use strict';
const assert = require('chai').assert;
const removeSomeCharacters = require('../lib/removeSomeCharacters');

describe('Remove Some Characters', function removeSomeCharactersDescribe() {
  let text = 'CLAFOUTIS%x26CHARLOTA';
  it('removeSomeCharacter should return a text A clean text, without spaces of more, nor characters not allowed', function dataProcessingIt() {
    let result = removeSomeCharacters.removeSomeCharacters(text);
    assert.isString(result);
    assert.equal(result, 'CLAFOUTIS+x+CHARLOTA');
  });

  it('removeSomeCharacter should NOT return a text A clean text', function removeSomeCharacterErrIt() {
    let result = removeSomeCharacters.removeSomeCharacters(text);
    assert.isString(result);
    assert.equal(result.indexOf('%'), -1);
  });
});