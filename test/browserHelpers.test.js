'use strict';
const assert = require('chai').assert;
const expect = require('chai').expect
const should = require('chai').should();
const {getUserAgent, getReferer} = require('../lib/browserHelpers');

describe('Browserhelpers', function() {
  describe('getUserAgent', function() {
    it('(Random) should return an string with a random user agent', function(done) {
      let result = getUserAgent();
      should.exist(result);
      expect(result).to.be.a.string
      done();
    });
    it('(Given a valid id) should return an string with the user agent correspondent to that id', function(done) {
      let result = getUserAgent(1);
      should.exist(result);
      assert.equal(result, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36');
      done();
    });
    it('(Random given an unknown parameter) should return a random user agent', function(done) {
      let result = getUserAgent('asdfasdf');
      should.exist(result);
      expect(result).to.be.a.string
      done();
    });
  });
  describe('getReferer', function() {
    it('(Random) should return an string with a random user agent', function(done) {
      let result = getReferer();
      should.exist(result);
      expect(result).to.be.a.string
      done();
    });
  });
});