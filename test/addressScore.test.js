'use strict';
const should = require('chai').should();
const { assert, expect } = require('chai');
const {getAddressScore} = require('../lib/addressScore');

  describe('getAddressScore', () => {
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
      let result = getAddressScore(add1, add2);
      should.exist(result);
      expect(result).to.equal(1);
    });
    it('should return a score less than 1', ()=>{
      let add1 = { street_address1: '',
        city: 'Mckinney',
        state: 'Texas',
        postal_code: '75070',
        country: null };
      let add2 = { street_address1: '14747 N  Blvd',
        city: 'Scottsdale',
        state: 'AZ',
        postal_code: '85260',
        country: null }
      let result = getAddressScore(add1, add2);
      should.exist(result);
      expect(result).to.equal(0);
    });
  });