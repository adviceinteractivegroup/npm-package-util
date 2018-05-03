'use strict';

const getBigrams = function getBigrams(str) {
  let bigrams = [];
  let strLength = str.length;
  for (let i = 0; i < strLength; i++) {
    bigrams.push(str.substr(i, 2));
  }
  return bigrams;
};

const sorensen = function sorensen(string1, string2) {
  if (typeof string1 !== 'string' || typeof string2 !== 'string') {
    throw new TypeError('Arguments must be string types');
  }

  let length1 = string1.length - 1;
  let length2 = string2.length - 1;
  if (length1 < 1 || length2 < 1) {
    return 0;
  }

  let intersection = 0;
  let bigrams1 = getBigrams(string1);
  let bigrams2 = getBigrams(string2);

  for (let i = 0; i < length1; i++) {
    for (let j = 0; j < length2; j++) {
      if (bigrams1[i] === bigrams2[j]) {
        intersection++;
        bigrams2[j] = null;
        break;
      }
    }
  }

  return 2.0 * intersection / (length1 + length2);
};

exports = module.exports = sorensen;
