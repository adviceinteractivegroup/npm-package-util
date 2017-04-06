'use strict';
const round = require('locutus/php/math/round');
const similar_text = require('locutus/php/strings/similar_text');
const verifyNapGp = function verifyNAP($array) {
  let $_a = $array.a.final;
  let $_b = $array.b.final;
  let $score = similar_text($_a, $_b, true);
  return round($score);
};

exports = module.exports = verifyNapGp;
