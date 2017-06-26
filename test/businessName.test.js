'use strict';
const assert = require('chai').assert;
const {filterStopWords} = require('../lib/businessName');

describe('businessName', function() {
  describe('filterStopWords', function () {
    it('Should remove the words: inc', function () {
      assert.equal(filterStopWords('Advice Interactive inc'), 'Advice Interactive');
    });
    it('Should remove words: and, &', function () {
      assert.equal(filterStopWords('Advice and Interactive & Hibu'), 'Advice Interactive Hibu');
    });
  });
});