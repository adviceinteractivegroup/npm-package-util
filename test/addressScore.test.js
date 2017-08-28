'use strict';
const should = require('chai').should();
const { assert, expect } = require('chai');
const {getAddrScore, getParseAddress} = require('../lib/addressScore');

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
      should.exist(result);
      expect(result).to.equal(1);
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
      should.exist(result);
      expect(result).to.equal(0.2);
    });
  });

  describe('getParseAddress', () => {
    it('should return a parse of the address', function fngetParseAddress(done) {
      getParseAddress('7850 Collin Mckinney pkwy, Mckinney, Texas, 75070')
        .then(result => {
          should.exist(result);
          assert.isObject(result);
          should.exist(result.street_address1);
          should.exist(result.city);
          should.exist(result.postal_code);
          should.exist(result.state);
          assert.propertyVal(result, 'street_address1', '7850 Collin Mckinney pkwy');
          assert.propertyVal(result, 'city', 'Mckinney');
          assert.propertyVal(result, 'state', 'TX');
          assert.propertyVal(result, 'postal_code', '75070');
          done();
        })
        .catch(err => {
          should.not.exist(err);
          done();
        });
    });
    it('should return a parse of the address without street', function fngetParseAddress(done) {
      getParseAddress('Mckinney, Texas, 75070')
        .then(result => {
          should.exist(result);
          assert.isObject(result);
          expect(result.street_address1).to.equal(null);
          should.exist(result.city);
          should.exist(result.postal_code);
          should.exist(result.state);
          assert.propertyVal(result, 'city', 'Mckinney');
          assert.propertyVal(result, 'state', 'TX');
          assert.propertyVal(result, 'postal_code', '75070');
          done();
        })
        .catch(err => {
          should.not.exist(err);
          done();
        });
    });
    it('should NOT return a parse of the address', function fngetParseAddress(done) {
      getParseAddress('nfo@TLCTransitionsAZ.com')
        .then(result => {
          should.exist(result);
          assert.isObject(result);
          expect(result.street_address1).to.equal(null);
          expect(result.state).to.equal(null);
          expect(result.postal_code).to.equal(null);
          done();
        })
        .catch(err => {
          should.not.exist(err);
          done();
        });
    });
  });