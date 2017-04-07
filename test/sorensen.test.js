'use strict';
const assert = require('chai').assert;
const sorensen = require('../lib/sorensen');

describe('sorensen', function () {
  it("sorensen should return 1 when comparing 'xxxxxxxxxxxxxxxxxxxx' to 'txxxxtttttxxxxxxxttt'", function () {
    assert.equal(sorensen('xxxxxxxxxxxxxxxxxxxx', 'txxxxtttttxxxxxxxttt'), 1); //disagree with this result
  });
  
  it("sorensen should return 0.9 when comparing 'Advice interactive group' and 'advice interactive'", function () {
    assert.equal(sorensen('Advice interactive group', 'advice interactive'), 0.9);
  });
  
  it("sorensen should return 0.7058823529411765 when comparing 'Advice interactive group' and 'advice inter'", function () {
    assert.equal(sorensen('Advice interactive group', 'advice inter'), 0.7058823529411765);
  });
  
  it("sorensen should return 0.7058823529411765 when comparing 'Advice interactive group' and 'advice inter'", function () {
    assert.equal(sorensen('Advice interactive group', "McDonald's"), 0);
  });
});
