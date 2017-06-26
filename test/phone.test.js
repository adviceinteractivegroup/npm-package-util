'use strict';
const assert = require('chai').assert;
const {normalizePhone} = require('../lib/phone');

describe('phone', function() {
  describe('normalizePhone', function () {
    it('Test normalizing url encoded plus brackets, +, -', function () {
      assert.equal(normalizePhone('%28304%29+755-8241'), '3047558241');
    });
    it('Test normalizing with country code and brackets', function () {
      assert.equal(normalizePhone('+1(920)766-2992'), '9207662992');
    });
    it('Test normalizing with brackets and white spaces', function () {
      assert.equal(normalizePhone('(920) 766-2992'), '9207662992');
    });
  });
});