'use strict';
const should = require('chai').should();
const {
  assert,
  expect
} = require('chai');
const {
  frontier,
  calculateBusinessScores,
  parseDirectoryBusinessesAddress,
  getBestResult
} = require('../lib/frontier');
const client = require('./data_mock/client');
const query = 'https://www.advicelocal.com/';

describe('frontier', () => {
  it('should return a selected json result', function frontierIt(done) {
    let resultsArray = [{
        query: 'https://www.advicelocal.com/',
        name: 'Flowers Unlimited, Inc.',
        url: 'https://www.advicelocal.com/contact-us/',
        address: '5532 66th Street North, Saint Petersburg, FL, 33709',
        phone: '(727) 384-5900'
      },
      {
        query: 'https://www.advicelocal.com/',
        name: 'Flowers Unlimited.',
        url: 'https://www.advicelocal.com/contact-us/',
        address: '5532 66th Street North, Saint Petersburg',
        phone: '(727) 384-4566'
      },
      {
        query: 'https://www.advicelocal.com/',
        name: 'Unlimited, Inc.',
        url: 'https://www.advicelocal.com/contact-us/',
        address: 'Saint Petersburg, FL, 33709',
        phone: '(456) 384-5900'
      },
      {
        query: 'https://www.advicelocal.com/',
        name: 'Flowers, Inc.',
        url: 'https://www.advicelocal.com/contact-us/',
        address: '5532 66th Street North, FL, 33709',
        phone: '(727) 678-5900'
      },
      {
        query: 'https://www.advicelocal.com/',
        name: 'Flowers Unlimited, Inc.',
        url: 'https://www.advicelocal.com/contact-us/',
        address: 'Saint Petersburg, FL, 33709',
        phone: '(727) 384-5900'
      }
    ];
    let data = {
      client,
      resultsArray
    };
    assert.isObject(data);
    frontier(data)
      .then(result => {
        should.exist(result);
        assert.isObject(result);
        assert.propertyVal(result.result[0], 'phone', '(727) 384-5900');
        assert.propertyVal(result.result[0], 'name', 'Flowers Unlimited, Inc.');
        assert.propertyVal(result.result[0], 'url', 'https://www.advicelocal.com/contact-us/');
        assert.propertyVal(result.result[0], 'address', '5532 66th Street North, Saint Petersburg, FL, 33709');
        assert.propertyVal(result, 'query', query);
        done();
      }).catch((err) => {
        should.not.exist(err);
        done();
      });
  });
  it('should not return a selected json result', function frontierIt(done) {
    let data = {
      error: {
        message: 'not found',
        query
      }
    };
    assert.isObject(data);
    frontier(data)
      .then(result => {
        should.exist(result);
        assert.isObject(result);
        assert.property(result, 'error');
        assert.property(result.error, 'message');
        assert.property(result.error, 'query');
        done();
      }).catch((err) => {
        should.not.exist(err);
        done();
      });
  });
  it('should return a selected json result with hide address directory', function frontierIt(done) {
    let resultsArray = [{
        query: 'https://www.xxx.com/',
        name: 'Restoration 1 of Wilmington',
        url: 'https://www.xxx.com/contact-us/',
        address: '107 Island Mimosa Dr Carolina Beach, NC 28428',
        phone: '(910) 684-4053'
      },
      {
        query: 'https://www.xxx.com/',
        name: 'Wilminton AR Housing',
        url: 'https://www.xxx.com/contact-us/',
        address: 'Wilmington, NC 28405',
        phone: '(910) 798-5727'
      },
      {
        query: 'https://www.xxx.com/',
        name: 'BC Stone Wilminton Inc',
        url: 'https://www.xxx.com/contact-us/',
        address: 'Wilmington, NC 28405',
        phone: '(910) 762-1770'
      },
      {
        query: 'https://www.xxx.com/',
        name: 'Aftermath Restoration',
        url: 'https://www.xxx.com/contact-us/',
        address: 'Wilmington, NC 28401',
        phone: '(910) 431-8803'
      },
      {
        query: 'https://www.xxx.com/',
        name: 'Allied Restoration Specialists Inc',
        url: 'https://www.xxx.com/contact-us/',
        address: 'Wilmington, NC 28405',
        phone: '(727) 384-5900'
      },
      {
        query: 'https://www.xxx.com/',
        name: 'Restoration 1 of Wilmington',
        url: 'https://www.xxx.com/contact-us/',
        address: 'Carolina Beach, NC 28428',
        phone: '(910) 684-4053'
      }
    ];
    const newClient = Object.assign({}, client);
    newClient.hide = true;
    newClient.businessName = 'restoration 1 of wilminton';
    newClient.city = 'Carolina beach';
    newClient.state = 'nc';
    newClient.zipcode = '28428';
    newClient.street1 = '27762 Antonio Parkway';
    let data = {
      client: newClient,
      resultsArray
    };
    assert.isObject(data);
    frontier(data)
      .then(result => {
        should.exist(result);
        assert.isObject(result);
        assert.propertyVal(result.result[0], 'phone', '(910) 684-4053');
        assert.propertyVal(result.result[0], 'name', 'Restoration 1 of Wilmington');
        assert.propertyVal(result.result[0], 'url', 'https://www.xxx.com/contact-us/');
        assert.propertyVal(result.result[0], 'address', 'Carolina Beach, NC 28428');
        done();
      }).catch((err) => {
        should.not.exist(err);
        done();
      });
  });
  it('should return a selected json result with hide address brownbook directory', function frontierIt(done) {
    let resultsArray = [{
        query: 'http://www.brownbook.net/businesses/?setcountry_ie=us&filter=us&p=1&tag=restoration+1+of+wilmington',
        name: 'RESTORATION 1 OF WILMINGTON',
        url: 'http://www.brownbook.net/business/42212298/restoration-1-of-wilmington',
        address: '107 ISLAND MIMOSA DR., CAROLINA BEACH, NC , 28428',
        phone: '(910) 684-4053'
      },
      {
        query: 'http://www.brownbook.net/businesses/?setcountry_ie=us&filter=us&p=1&tag=restoration+1+of+wilmington',
        name: 'RESTORATION 1 OF WILMINGTON',
        url: 'http://www.brownbook.net/business/44475982/restoration-1-of-wilmington',
        address: 'Wilmington, NC 28405',
        phone: '(910)684-4053'
      }
    ];
    const newClient = Object.assign({}, client);
    newClient.hide = true;
    newClient.businessName = 'RESTORATION 1 OF WILMINGTON';
    newClient.city = 'CAROLINA BEACH, , 28428';
    newClient.state = 'NC';
    newClient.zipcode = '28405';
    newClient.street1 = '107 ISLAND MIMOSA DR., CAROLINA BEACH, NC , 28428';
    let data = {
      client: newClient,
      resultsArray
    };
    assert.isObject(data);
    frontier(data)
      .then(result => {
        should.exist(result);
        assert.isObject(result);
        assert.propertyVal(result.result[0], 'phone', '(910)684-4053');
        assert.propertyVal(result.result[0], 'name', 'RESTORATION 1 OF WILMINGTON');
        assert.propertyVal(result.result[0], 'url', 'http://www.brownbook.net/business/44475982/restoration-1-of-wilmington');
        assert.propertyVal(result.result[0], 'address', 'Wilmington, NC 28405');
        done();
      }).catch((err) => {
        should.not.exist(err);
        done();
      });
  });
  it('should return a selected json result with hide address elocal directory', function frontierIt(done) {
    let resultsArray = [{
        query: 'https://www.elocal.com/search/NC/Carolina+Beach?search_category=restoration+1+of+wilmington#!/page=1',
        name: 'Wilmington Restoration Pros',
        url: 'https://www.elocal.com/profile/wilmington-restoration-pros-18701013/#!/tab=about',
        address: '1213 Culbreth Dr Wilmington, NC 28405',
        phone: '910-745-0817'
      },
      {
        query: 'https://www.elocal.com/search/NC/Carolina+Beach?search_category=restoration+1+of+wilmington#!/page=1',
        name: 'Restoration 1 of Wilmington',
        url: 'https://www.elocal.com/profile/restoration-1-of-wilmington-19190384/#!/tab=map',
        address: 'Carolina Beach, NC 28428',
        phone: '910-684-4053'
      }
    ];
    const newClient = Object.assign({}, client);
    newClient.hide = true;
    newClient.businessName = 'RESTORATION 1 OF WILMINGTON';
    newClient.city = 'CAROLINA BEACH, , 28428';
    newClient.state = 'NC';
    newClient.zipcode = '28405';
    newClient.street1 = '107 ISLAND MIMOSA DR., CAROLINA BEACH, NC , 28428';
    let data = {
      client: newClient,
      resultsArray
    };
    assert.isObject(data);
    frontier(data)
      .then(result => {
        should.exist(result);
        assert.isObject(result);
        assert.propertyVal(result.result[0], 'phone', '910-684-4053');
        assert.propertyVal(result.result[0], 'name', 'Restoration 1 of Wilmington');
        assert.propertyVal(result.result[0], 'url', 'https://www.elocal.com/profile/restoration-1-of-wilmington-19190384/#!/tab=map');
        assert.propertyVal(result.result[0], 'address', 'Carolina Beach, NC 28428');
        done();
      }).catch((err) => {
        should.not.exist(err);
        done();
      });
  });
});

describe('calculateBusinessScores', () => {
  it('should return a correct score', () => {
    let parsedClientAddr = {
      street_address1: '5532 66th st N',
      city: 'Saint Petersburg',
      state: 'FL',
      postal_code: '33709',
      country: null
    };
    let directory = {
      query: 'https://www.advicelocal.com/',
      name: 'Flowers Unlimited, Inc.',
      url: 'https://www.advicelocal.com/contact-us/',
      address: '5532 66th Street North, Saint Petersburg, FL, 33709',
      phone: '(727) 384-5900',
      parseAddress: {
        street_address1: '5532 66th st N',
        city: 'Saint Petersburg',
        state: 'FL',
        postal_code: '33709',
        country: null
      }
    };
    client.hide = null;
    let result = calculateBusinessScores(client, parsedClientAddr, directory);
    should.exist(result);
    assert.isObject(result);
    assert.propertyVal(result, 'query', 'https://www.advicelocal.com/');
    assert.propertyVal(result, 'name', 'Flowers Unlimited, Inc.');
    assert.propertyVal(result, 'url', 'https://www.advicelocal.com/contact-us/');
    assert.propertyVal(result, 'address', '5532 66th Street North, Saint Petersburg, FL, 33709');
    assert.propertyVal(result, 'addrScore', 1);
    assert.propertyVal(result, 'phoneScore', 1);
    assert.propertyVal(result, 'nameSorensenScore', 1);
    assert.propertyVal(result, 'nameLevenshteinScore', 0);
    assert.isObject(result.parseAddress);
  });
  it('should return a score of addrScore:0', () => {
    let parsedClientAddr = {};
    let directory = {
      query: 'https://www.advicelocal.com/',
      name: 'Flowers Unlimited, Inc.',
      url: 'https://www.advicelocal.com/contact-us/',
      address: '5532 66th Street North, Saint Petersburg, FL, 33709',
      phone: '(727) 384-5900',
      parseAddress: {}
    };
    let result = calculateBusinessScores(client, parsedClientAddr, directory);
    should.exist(result);
    assert.isObject(result);
    assert.propertyVal(result, 'query', 'https://www.advicelocal.com/');
    assert.propertyVal(result, 'name', 'Flowers Unlimited, Inc.');
    assert.propertyVal(result, 'url', 'https://www.advicelocal.com/contact-us/');
    assert.propertyVal(result, 'address', '5532 66th Street North, Saint Petersburg, FL, 33709');
    assert.propertyVal(result, 'addrScore', 0);
    assert.propertyVal(result, 'phoneScore', 1);
    assert.propertyVal(result, 'nameSorensenScore', 1);
    assert.propertyVal(result, 'nameLevenshteinScore', 0);
    assert.isObject(result.parseAddress);
  });
  it('should return a score of null', () => {
    let parsedClientAddr = {};
    let directory = {
      query: 'https://www.advicelocal.com/',
      url: 'https://www.advicelocal.com/contact-us/',
      address: '5532 66th Street North, Saint Petersburg, FL, 33709',
      parseAddress: {}
    };
    let result = calculateBusinessScores(client, parsedClientAddr, directory);
    expect(result).to.equal(null);
  });
});

describe('parseDirectoryBusinessesAddress', () => {
  it('should return a correct Parse address', function frontierIt(done) {
    let directoriesArray = [{
      query: 'https://www.advicelocal.com/',
      name: 'Flowers Unlimited, Inc.',
      url: 'https://www.advicelocal.com/contact-us/',
      address: '5532 66th Street North, Saint Petersburg, FL, 33709',
      phone: '(727) 384-5900'
    }];
    parseDirectoryBusinessesAddress(directoriesArray)
      .then(result => {
        should.exist(result);
        assert.isObject(result[0]);
        assert.propertyVal(result[0], 'phone', '(727) 384-5900');
        assert.propertyVal(result[0], 'name', 'Flowers Unlimited, Inc.');
        assert.propertyVal(result[0], 'url', 'https://www.advicelocal.com/contact-us/');
        assert.propertyVal(result[0], 'address', '5532 66th Street North, Saint Petersburg, FL, 33709');
        assert.propertyVal(result[0], 'query', 'https://www.advicelocal.com/');
        assert.isObject(result[0].parseAddress);
        done();
      }).catch((err) => {
        should.not.exist(err);
        done();
      });
  });
  it('should NOT return a correct Parse address', function frontierIt(done) {
    let directoriesArray = [{
      query: 'https://www.advicelocal.com/',
      name: 'Flowers Unlimited, Inc.',
      url: 'https://www.advicelocal.com/contact-us/',
      address: null,
      phone: '(727) 384-5900'
    }];
    parseDirectoryBusinessesAddress(directoriesArray)
      .then(result => {
        should.not.exist(result);
        done();
      }).catch((err) => {
        should.exist(err);
        done();
      });
  });
});

describe('getBestResult', () => {
  it('should return the best result', () => {
    let scores = [{
      query: 'https://www.advicelocal.com/',
      name: 'Flowers Unlimited, Inc.',
      url: 'https://www.advicelocal.com/contact-us/',
      address: '5532 66th Street North, Saint Petersburg, FL, 33709',
      phone: '(727) 384-5900',
      parseAddress: {
        street_address1: '5532 66th st N',
        city: 'Saint Petersburg',
        state: 'FL',
        postal_code: '33709',
        country: null
      },
      addrScore: 1,
      phoneScore: 1,
      nameSorensenScore: 0.9142857142857143,
      nameLevenshteinScore: 3
    }];
    let result = getBestResult(scores, query);
    should.exist(result);
    assert.isObject(result);
    assert.propertyVal(result, 'query', 'https://www.advicelocal.com/');
    assert.propertyVal(result, 'results', true);
    assert.propertyVal(result, 'message', 'OK');
    assert.propertyVal(result.result[0], 'phone', '(727) 384-5900');
    assert.propertyVal(result.result[0], 'name', 'Flowers Unlimited, Inc.');
    assert.propertyVal(result.result[0], 'url', 'https://www.advicelocal.com/contact-us/');
    assert.propertyVal(result.result[0], 'address', '5532 66th Street North, Saint Petersburg, FL, 33709');
  });
  it('should NOT return the best result', () => {
    let scores = [];
    let result = getBestResult(scores, query);
    should.exist(result);
    assert.isObject(result);
    assert.property(result, 'error');
    assert.property(result.error, 'message');
    assert.property(result, 'query');
  });
});
