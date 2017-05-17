'use strict';
const assert = require('chai').assert;
const should = require('chai').should();
const {getProxy} = require('../index');

describe('getProxy', function () {
  it('should return an object with Proxy credentials for type=search-proxy', function(done) {
    this.timeout(10000);
    this.retries(3);
    let type = 'search-proxy';
    getProxy(type)
      .then(result=>{
        should.exist(result);
        assert.isObject(result);
        assert.propertyVal(result, 'username', 'advicei');
        assert.propertyVal(result, 'password', 'hin98ab26bg');
        assert.propertyVal(result, 'server', 'cloudproxy.lssdev.com');
        assert.propertyVal(result, 'port', 80);
        done();
      })
      .catch(err=>{
        console.log('err', err)
        should.not.exist(err);
        done();
      });
  });
  
  it('should return an object with Proxy credentials for type=search-bigg', function(done) {
    this.timeout(10000);
    this.retries(3);
    let type = 'search-bigg';
    getProxy(type)
      .then(result=>{
        should.exist(result);
        assert.isObject(result);
        assert.propertyVal(result, 'username', 'localsitesubmit');
        assert.propertyVal(result, 'password', 'jd829ka658njav1j');
        assert.propertyVal(result, 'server', 'cloudsearch.lssdev.com');
        assert.propertyVal(result, 'port', 80);
        done();
      })
      .catch(err=>{
        console.log('err', err)
        should.not.exist(err);
        done();
      });
  });
  
  it('should return an object with Proxy credentials for type=google-plus', function(done) {
    this.timeout(10000);
    this.retries(3);
    let type = 'google-plus';
    getProxy(type)
      .then(result=>{
        should.exist(result);
        assert.isObject(result);
        assert.property(result, 'apiKey');
        done();
      })
      .catch(err=>{
        console.log('err', err)
        should.not.exist(err);
        done();
      });
  });
  
  it('should return an object with Proxy credentials for type=georanker', function(done) {
    this.timeout(10000);
    this.retries(3);
    let type = 'georanker';
    getProxy(type)
      .then(result=>{
        should.exist(result);
        assert.isObject(result);
        assert.propertyVal(result, 'apiKey', 'ad9d710076449ead6d536f0ce5effebe');
        done();
      })
      .catch(err=>{
        console.log('err', err)
        should.not.exist(err);
        done();
      });
  });
  
  it('should return an object with Proxy credentials for type=google-places', function(done) {
    this.timeout(10000);
    this.retries(3);
    let type = 'google-places';
    getProxy(type)
      .then(result=>{
        should.exist(result);
        assert.isObject(result);
        assert.property(result, 'apiKey');
        done();
      })
      .catch(err=>{
        console.log('err', err)
        should.not.exist(err);
        done();
      });
  });
  
  it('should return an object with Proxy credentials for type=google-plus', function(done) {
    this.timeout(10000);
    this.retries(3);
    let type = 'google-plus';
    getProxy(type)
      .then(result=>{
        should.exist(result);
        assert.isObject(result);
        assert.property(result, 'apiKey');
        done();
      })
      .catch(err=>{
        console.log('err', err)
        should.not.exist(err);
        done();
      });
  });
  
  it('should return an object with Proxy credentials for type=address-verification', function(done) {
    this.timeout(10000);
    this.retries(3);
    let type = 'address-verification';
    getProxy(type)
      .then(result=>{
        should.exist(result);
        assert.isObject(result);
        assert.propertyVal(result, 'auth-id', 'c794afbc-e97f-42b7-a81b-96291227b67a');
        assert.propertyVal(result, 'auth-token', 'PhoRvVxB9AxX2s7WydbE');
        done();
      })
      .catch(err=>{
        console.log('err', err)
        should.not.exist(err);
        done();
      });
  });
  
  it('should return an error when type is invalid', function(done) {
    this.timeout(10000);
    this.retries(3);
    let type = 'xxxxxxxxx';
    getProxy(type)
      .then(result=>{
        should.not.exist(result);
        done();
      })
      .catch(err=>{
        should.exist(err);
        assert.equal(err.message, `Invalid type ${type}`);
        done();
      });
  });
});

