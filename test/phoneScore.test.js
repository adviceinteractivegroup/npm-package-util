'use strict';
const should = require('chai').should();
const { assert, expect } = require('chai');
const {getPhoneScore} = require('../lib/phoneScore');


describe('getPhoneScore', function getPhoneScoreDes() {
  this.timeout(20000);
  this.retries(3);
  it('should return a score of 1', ()=>{
    let result = getPhoneScore('(214) 310-1356', '+12143101356');
    should.exist(result);
    expect(result).to.equal(1);
  });
  it('should return a score of 0', ()=>{
    let result = getPhoneScore('(214) 310-1356', '+12345424567');
    should.exist(result);
    expect(result).to.equal(0);
  });
});