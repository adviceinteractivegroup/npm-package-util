'use strict';
const should = require('chai').should();
const { assert, expect } = require('chai');
const {getAddrScore} = require('../lib/addressScore');

  describe('getAddrScore', () => {
    it('should return a score of 1', ()=>{
      let add1 = { street_address1: '7850 Collin Mckinney pkwy',
        city: 'Mckinney',
        state: 'Texas',
        postal_code: '75070',
        country: null };
      let add2 = { street_address1: '7850 Collin Mckinney pkwy',
        city: 'Mckinney',
        state: 'Texas',
        postal_code: '75070',
        country: null }
      let result = getAddrScore(add1, add2);
      console.log(result);
      // should.exist(result);
      // expect(result).to.equal(1);
    });
    it('should return a score less than 1', ()=>{
      let add1 = { street_address1: '7850 Collin Mckinney pkwy',
        city: 'Mckinney',
        state: 'Texas',
        postal_code: '75070',
        country: null };
      let add2 = { street_address1: '14747 N  Blvd',
        city: 'Scottsdale',
        state: 'AZ',
        postal_code: '85260',
        country: null }
      let result = getAddrScore(add1, add2);
      // should.exist(result);
      // expect(result).to.equal(0.2);
    });
  });