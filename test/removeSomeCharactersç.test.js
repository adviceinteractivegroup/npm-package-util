'use strict';
const assert = require('chai').assert;
const removeSomeCharacters = require('../lib/removeSomeCharacters');

describe('Remove Some Characters for Plus', function removeSomeCharactersDescribe() {
  let text = 'CLAFOUTIS%x26CHARLOTA';
  it('removeSomeCharacter should return a text A clean text, without spaces of more, nor characters not allowed', function dataProcessingIt() {
    let result = removeSomeCharacters.removeSomeCharactersForPlus(text);
    assert.isString(result);
    assert.equal(result, 'CLAFOUTIS+x+CHARLOTA');
  });

  it('removeSomeCharacter should NOT return a text A clean text', function removeSomeCharacterErrIt() {
    let result = removeSomeCharacters.removeSomeCharactersForPlus(text);
    assert.isString(result);
    assert.equal(result.indexOf('%'), -1);
  });
});

describe('Remove Some Characters for Empty', function removeSomeCharactersDescribe() {
  let text = 'Yellow%x26+Red Blue';
  it('removeSomeCharacter should return a text A clean text, without spaces of more, nor characters not allowed', function dataProcessingIt() {
    let result = removeSomeCharacters.removeSomeCharactersForEmpty(text);
    assert.isString(result);
    assert.equal(result, 'Yellow x  Red Blue');
  });

  it('removeSomeCharacter should NOT return a text A clean text', function removeSomeCharacterErrIt() {
    let result = removeSomeCharacters.removeSomeCharactersForEmpty(text);
    assert.isString(result);
    assert.equal(result.indexOf('%'), -1);
  });
});