'use strict';
const assert = require('chai').assert;
const cleanText = require('../lib/cleanText');

describe('cleanText', function cleanTextDescribe() {
  let text = 'CLAFOUTIS%x26CHARLOTA';
  it('cleanText should return a text A clean text, without spaces of more, nor characters not allowed', function dataProcessingIt() {
    let result = cleanText.cleanText(text);
    assert.isString(result);
    assert.equal(result, 'CLAFOUTIS+x+CHARLOTA');
  });

  it('cleanText should NOT return a text A clean text', function dataProcessingIt() {
    let result = cleanText.cleanText(text);
    assert.isString(result);
    assert.equal(result.indexOf('%'), -1);
  });
});