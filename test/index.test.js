const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const util = require('../index');

describe('util.js', function() {
  describe('isNumeric', function() {
    it("'2' should be a number", function () {
      assert.isTrue(util.isNumeric('2'));
    });
    
    it("'e2' should NOT be a number", function () {
      assert.isNotTrue(util.isNumeric('e2'));
    });
    
    it("'1.5' should be a number", function () {
      assert.isTrue(util.isNumeric('1.5'));
    });
    
    it("0.5 should be a number", function () {
      assert.isTrue(util.isNumeric(0.5));
    });
    
    it("8 should be a number", function () {
      assert.isTrue(util.isNumeric(8));
    });
    
    it("'abcdefghi' should NOT be a number", function () {
      assert.isNotTrue(util.isNumeric('abcdefghi'));
    });
    
    it("'.' should NOT be a number", function () {
      assert.isNotTrue(util.isNumeric('.'));
    });
    
    it("'' should NOT be a number", function () {
      assert.isNotTrue(util.isNumeric(''));
    });
  });
  
  describe('isURL',function(){
    it("If i send a correct URL the result will have to be true", function(){
      assert.isTrue(util.isURL("https://p.lssdev.com/legacyfulfillmentdata?client=1111&skip=1111"));
    });
    it("If i send a empty URL the result will have to be false", function(){
      assert.isFalse(util.isURL());
    });
    it("If i send a NULL URL the result will have to be false", function(){
      assert.isFalse(util.isURL(null));
    });
    it("If i send a simple text the result will have to be false", function(){
      assert.isFalse(util.isURL('thisisatext'));
    });
    it("If i send a number the result will have to be false", function(){
      assert.isFalse(util.isURL('11111'));
    });
  })
});

