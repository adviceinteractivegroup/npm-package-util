'use strict';
const should = require('chai').should();
const { assert, expect } = require('chai');
const {getAddressScore} = require('../lib/addressScore');

describe('getAddressScore', () => {
  it('should return score = 1', ()=>{
    let add1 = { 
      street_address1: '7850 Collin Mckinney pkwy',
      city: 'Mckinney',
      state: 'TX',
      postal_code: '75070',
      country: null
    };
    let add2 = { 
      street_address1: '7850 Collin Mckinney pkwy',
      city: 'Mckinney',
      state: 'TX',
      postal_code: '75070',
      country: null
    };
    let result = getAddressScore(add1, add2);
    should.exist(result);
    expect(result).to.equal(1);
  });
  it('should return a score less than 1', ()=>{
    let add1 = { 
      street_address1: '',
      city: 'Mckinney',
      state: 'Texas',
      postal_code: '75070',
      country: null 
    };
    let add2 = { 
      street_address1: '14747 N  Blvd',
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85260',
      country: null
    };
    let result = getAddressScore(add1, add2);
    should.exist(result);
    expect(result).to.equal(0);
  });
  it('should return score = 1 because hide addr = true & the addr segments to score have not been set', ()=>{
    let add1 = { 
      street_address1: '7850 Collin Mckinney pkwy',
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85260',
      country: null,
      hide: true
    };
    let add2 = { 
      street_address1: '',
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85260',
      country: null
    };
    let result = getAddressScore(add1, add2);
    should.exist(result);
    expect(result).to.equal(1);
  });
  it('should return score = 1 because hide addr = true & all addr segments to score are set to true', ()=>{
    let add1 = { 
      hideRules : {
        postalCode : true,
        city: true,
        state: true
      },
      street_address1: '7850 Collin Mckinney pkwy',
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85260',
      country: null,
      hide: true
    };
    let add2 = { 
      street_address1: null,
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85260',
      country: null
    };
    let result = getAddressScore(add1, add2);
    should.exist(result);
    expect(result).to.equal(1);
  });
  it('should return score = 0.6~ because hide addr = true & all addr segments to score are = true, but addr2.state != addr1.state', () => {
    let add1 = {
      hideRules: {
        postalCode: true,
        city: true,
        state: true
      },
      street_address1: '7850 Collin Mckinney pkwy',
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85260',
      country: null,
      hide: true
    };
    let add2 = {
      street_address1: null,
      city: 'Scottsdale',
      state: null,
      postal_code: '85260',
      country: null
    };
    let result = getAddressScore(add1, add2);
    should.exist(result);
    expect(result).to.equal(0.6666666666666666);
  });
  it('should return score = 0.6~ because hide addr = true & all addr segments to score are = true, but addr2.postal_code != addr1.postal_code', () => {
    let add1 = {
      hideRules: {
        postalCode: true,
        city: true,
        state: true
      },
      street_address1: '7850 Collin Mckinney pkwy',
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85261',
      country: null,
      hide: true
    };
    let add2 = {
      street_address1: null,
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85260',
      country: null
    };
    let result = getAddressScore(add1, add2);
    should.exist(result);
    expect(result).to.equal(0.6666666666666666);
  });
  it('should return score = 0.9~ because hide addr = true & addr2.street != null, so it gets a small penalization', ()=>{
    let add1 = { 
      hideRules : {
        postalCode : true,
        city: true,
        state: true
      },
      street_address1: null,
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85260',
      country: null,
      hide: true
    };
    let add2 = { 
      street_address1: '7850 Collin Mckinney pkwy',
      city: 'Scottsdale',
      state: 'AZ',
      postal_code: '85260',
      country: null
    };
    let result = getAddressScore(add1, add2);
    should.exist(result);
    expect(result).to.equal(0.9966666666666667);
  });
  it('should return score = 0.9. hide addr = true & segment to score = city & it is slightly different in add1 & addr2', ()=>{
    let add1 = { 
      hideRules : {
        postalCode : false,
        city: true,
        state: false
      },
      city: 'Scottsdale',
      hide: true
    };
    let add2 = { 
      city: 'Scottsdale x',
    };
    let result = getAddressScore(add1, add2);
    should.exist(result);
    expect(result).to.equal(0.9);
  });
});
