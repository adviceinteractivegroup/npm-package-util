'use strict';
const assert = require('chai').assert;
const {getAbreviatedState} = require('../lib/address');

describe('address', function() {
  describe('getAbreviatedState', function () {
    it('Valid state name, should return a valid abreviated State', function () {
      assert.equal(getAbreviatedState('Alaska'), 'AK');
    });
    it('Invalid state name, should return return the same string', function () {
      assert.equal(getAbreviatedState('Antioquia'), 'Antioquia');
    });
  });
});