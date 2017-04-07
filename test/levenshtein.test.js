const assert = require('chai').assert;
const levenshtein = require('../lib/levenshtein');

it('Levenshtein correctness', function() {
  assert.equal(levenshtein('abcd', 'abc'), 1);
  assert.equal(levenshtein('abc d', 'abc'), 2);
  assert.equal(levenshtein('xxxxxxxxxxxxxxxxxxxx', 'txxxxtttttxxxxxxxttt'), 9);
  assert.equal(levenshtein('Advice interactive group', 'advice interactive'), 7);
  assert.equal(levenshtein('Advice interactive group', 'advice inter'), 13);
  assert.equal(levenshtein('Advice interactive group', "McDonald's"), 21);
});
