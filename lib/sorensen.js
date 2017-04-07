'use strict';

const intersect = function intersect(arr1, arr2) {
  let r = [];
  let o = {};
  let l = arr2.length;
  let v;
  let i;
  for (i = 0; i < l; i++) {
    o[arr2[i]] = true;
  }
  l = arr1.length;
  for (i = 0; i < l; i++) {
    v = arr1[i];
    if (v in o) {
      r.push(v);
    }
  }
  return r;
};

const pairs = function pairs(text) {
  let pairs = [];
  for (let i = 0; i < text.length - 1; i++) {
    pairs[i] = text.slice(i, i + 2);
  }
  return pairs;
};

const sorensen = function sorensen(text1, text2) {
  let textLC1 = text1.replace('/\s/g', '').toLowerCase();
  let textLC2 = text2.replace('/\s/g', '').toLowerCase();
  
  let similarityNum = 2 * intersect(pairs(textLC1), pairs(textLC2)).length;
  let similarityDen = pairs(textLC1).length + pairs(textLC2).length;
  
  return similarityNum / similarityDen;
};

exports = module.exports = sorensen;
