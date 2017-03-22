'use strict';
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
  
  describe('getDirectories', function () {
    let rows = require('./getDirectories');
    
    it("getDirectories should return a total rows and directories", function (done) {
      util.getDirectories(rows)
        .then(function (result) {
          should.exist(result);
          assert.isObject(result);
          should.exist(result.rows);
          assert.equal(result.rows, rows);
          should.exist(result.directories);
          assert.isArray(result.directories);
          assert.isAtLeast(result.directories.length,1);
          assert.isString(result.directories[0])
          done();
        })
        .catch(function (err) {
          should.not.exist(err);
          done();
        });
    });
    
    it("getDirectories should return an error when dont sent a correct array for rows", function (done) {
      util.getDirectories('a')
        .then(function (result) {
          should.not.exist(result);
          done();
        })
        .catch(function (err) {
          should.exist(err);
          assert.isObject(err);
          assert.property(err, 'message');
          assert.equal(err.message, 'No directories to filter');
          done();
        });
    });
  });
});

