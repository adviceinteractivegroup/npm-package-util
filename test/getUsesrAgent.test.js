'use strict';
const assert = require('chai').assert;
const expect = require('chai').expect
const should = require('chai').should();
const {getUserAgent} = require('../index');

describe('getUserAgent', function () {
  it('(Random) should return an string with a random user agent', function(done) {
    this.timeout(10000);
    let result = getUserAgent();
    should.exist(result);
    expect(result).to.be.a.string
    done();
  });
  it('(Random given a browserType) should return an string with a random user agent', function(done) {
    this.timeout(10000);
    let result = getUserAgent('Chrome');
    should.exist(result);
    expect(result).to.be.a.string
    done();
  });
  it('(Random given an unknown browserType) should return null', function(done) {
    this.timeout(10000);
    let result = getUserAgent('asdfasdf');
    should.not.exist(result);
    expect(result).to.be.a.string
    done();
  });
});