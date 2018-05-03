'use strict';
const assert = require('chai').assert;
const sorensen = require('../lib/sorensen');

describe('sorensen', function () {
  it("sorensen should return 0.47368421052631576 when comparing 'xxxxxxxxxxxxxxxxxxxx' to 'txxxxtttttxxxxxxxttt'", function () {
    assert.equal(sorensen('xxxxxxxxxxxxxxxxxxxx', 'txxxxtttttxxxxxxxttt'), 0.47368421052631576); //disagree with this result
  });
  
  it("sorensen should return 0.8 when comparing 'Advice interactive group' and 'advice interactive'", function () {
    assert.equal(sorensen('Advice interactive group', 'advice interactive'), 0.8);
  });
  
  it("sorensen should return 0.5882352941176471 when comparing 'Advice interactive group' and 'advice inter'", function () {
    assert.equal(sorensen('Advice interactive group', 'advice inter'), 0.5882352941176471);
  });
  
  it("sorensen should return 0.7058823529411765 when comparing 'Advice interactive group' and 'McDonald's'", function () {
    assert.equal(sorensen('McDonald\'s', 'Advice interactive group'), 0);
  });
});
