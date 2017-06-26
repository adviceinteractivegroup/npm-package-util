'use strict';
const assert = require('chai').assert;
const {isNumeric, isURL, grep} = require('../lib/general');

describe('general', function() {
  describe('isNumeric', function () {
    it("'2' should be a number", function () {
      assert.isTrue(isNumeric('2'));
    });
    
    it("'e2' should NOT be a number", function () {
      assert.isNotTrue(isNumeric('e2'));
    });
    
    it("'1.5' should be a number", function () {
      assert.isTrue(isNumeric('1.5'));
    });
    
    it("0.5 should be a number", function () {
      assert.isTrue(isNumeric(0.5));
    });
    
    it("8 should be a number", function () {
      assert.isTrue(isNumeric(8));
    });
    
    it("'abcdefghi' should NOT be a number", function () {
      assert.isNotTrue(isNumeric('abcdefghi'));
    });
    
    it("'.' should NOT be a number", function () {
      assert.isNotTrue(isNumeric('.'));
    });
    
    it("'' should NOT be a number", function () {
      assert.isNotTrue(isNumeric(''));
    });
  });
  
  describe('isURL', function () {
    it("If i send a correct URL the result will have to be true", function () {
      assert.isTrue(isURL("https://p.lssdev.com/legacyfulfillmentdata?client=1111&skip=1111"));
    });
    it("If i send a empty URL the result will have to be false", function () {
      assert.isFalse(isURL());
    });
    it("If i send a NULL URL the result will have to be false", function () {
      assert.isFalse(isURL(null));
    });
    it("If i send a simple text the result will have to be false", function () {
      assert.isFalse(isURL('thisisatext'));
    });
    it("If i send a number the result will have to be false", function () {
      assert.isFalse(isURL('11111'));
    });
  })
  describe('grep', function () {
    it("Returns array elements that satisfy the function condition (second parametre)", function () {
      let result = grep(['hello', 'world', null, '', '!'], Boolean);
      assert.isArray(result, 'grep result is array');
      assert.lengthOf(result, 3, 'grep array result lenght equals 3');
      assert.deepEqual(result, [ 'hello', 'world', '!' ], 'array result must be equal to: [ hello, world, ! ]');
    });
  });
});
