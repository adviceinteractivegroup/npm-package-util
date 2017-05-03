'use strict';
const sorensen = require('../lib/sorensen');
const levenshtein = require('../lib/levenshtein');

const frontier = function frontier(data, clientData) {
  if(!data || !clientData) {
    return null;
  }
  let sorensenScore = sorensen(clientData, data);
  let levenshteinScore = levenshtein(clientData, data);
  if (sorensenScore >= 0.65 && levenshteinScore < 8) {
    return data;
  } else {
    return null;
  }
};

exports = module.exports = {
  frontier: frontier
};
