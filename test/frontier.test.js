'use strict';
const assert = require('chai').assert;
const frontier = require('../lib/frontier');

describe('Frontier', function removeSomeCharactersDescribe() {
  it('frontier Uses the functions sorensen and levenshtein, should return a correct string if the socre is sorensenScore >= 0.65 && levenshteinScore < 8', function dataProcessingIt() {
    let result = frontier.frontier('HOSPITAL CENTER SANTA MONICA', 'HOSPITAL CENTER SANTA MONICA');
    assert.equal(result, 'HOSPITAL CENTER SANTA MONICA');
  });
    it('frontier Uses the functions sorensen and levenshtein, should return null if the socre is does not in sorensenScore >= 0.65 && levenshteinScore < 8', function dataProcessingIt() {
    let result = frontier.frontier('HOSPITAL CENTER SANTA MONICA', 'CENTER HOSPITAL MONICA SANTA ');
    assert.isNull(result);
  });
});
