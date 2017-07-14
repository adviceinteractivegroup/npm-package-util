'use strict';
const assert = require('chai').assert;
const {getAbreviatedState, normalizeSuite, normalizeCompass} = require('../lib/address');

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
  describe('normalizeCompass', function () {
    it('Normalizing Compass should replace \'East South East\', by \'E SE\'', function () {
      assert.equal(normalizeCompass('61 East South East Madison St. ste 2000'), '61 E SE Madison St. ste 2000');
    });
    it('Normalizing Compass should replace \'s\', by \'S\'', function () {
      assert.equal(normalizeCompass('61 s Madison St. Ste 2000'), '61 S Madison St. Ste 2000');
    });
    it('Normalizing Compass should replace \'Northwest\', by \'NW\'', function () {
      assert.equal(normalizeCompass('61 Northwest Madison St. Ste. 2000'), '61 NW Madison St. Ste. 2000');
    });
    it('Normalizing suite, should return same string', function () {
      assert.equal(normalizeCompass('Antioquia'), 'Antioquia');
    });
  });
});