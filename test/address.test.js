'use strict';
const assert = require('chai').assert;
const {getAbreviatedState, normalizeSuite} = require('../lib/address');

describe('address', function() {
  describe('getAbreviatedState', function () {
    it('Valid state name, should return a valid abreviated State', function () {
      assert.equal(getAbreviatedState('Alaska'), 'AK');
    });
    it('Invalid state name, should return return the same string', function () {
      assert.equal(getAbreviatedState('Antioquia'), 'Antioquia');
    });
  });
  describe('normalizeSuite', function () {
    it('Normalizing suite, should replace ste by #', function () {
      assert.equal(normalizeSuite('61 East Madison St. Chicago ste 2000, NY 60603, US'), '61 East Madison St. Chicago # 2000, NY 60603, US');
    });
    it('Normalizing suite, should replace Ste by #', function () {
      assert.equal(normalizeSuite('61 East Madison St. Chicago Ste 2000, NY 60603, US'), '61 East Madison St. Chicago # 2000, NY 60603, US');
    });
    it('Normalizing suite, should replace Ste. by #', function () {
      assert.equal(normalizeSuite('61 East Madison St. Chicago Ste. 2000, NY 60603, US'), '61 East Madison St. Chicago # 2000, NY 60603, US');
    });
    it('Normalizing suite, should return same string', function () {
      assert.equal(normalizeSuite('Antioquia'), 'Antioquia');
    });
  });
});