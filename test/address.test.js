'use strict';
const should = require('chai').should();
const {
    assert,
    expect
} = require('chai');
const {
    getAbreviatedState,
    getAbreviatedCAProvince,
    normalizeSuite,
    normalizeCompass,
    normalizeStreetType,
    parseAddress,
    parseCanadaAddress
} = require('../lib/address');

describe('address', function() {
    describe('getAbreviatedState', function() {
        it('Valid state name, should return a valid abreviated State', function() {
            assert.equal(getAbreviatedState('Alaska'), 'AK');
        });
        it('Invalid state name, should return return the same string', function() {
            assert.equal(getAbreviatedState('Antioquia'), 'Antioquia');
        });
    });
    describe('getAbreviatedCAProvince', function() {
        it('Valid Canada province name, should return a valid abreviated', function() {
            assert.equal(getAbreviatedState('Newfoundland and Labrador'), 'NL');
        });
        it('Invalid Canada province name, should return the same string', function() {
            assert.equal(getAbreviatedState('Antioquia'), 'Antioquia');
        });
    });
    describe('normalizeSuite', function() {
        it('Normalizing suite, should replace ste by #', function() {
            assert.equal(normalizeSuite('61 East Madison St. Chicago ste 2000, NY 60603, US'), '61 East Madison St. Chicago # 2000, NY 60603, US');
        });
        it('Normalizing suite, should replace Ste by #', function() {
            assert.equal(normalizeSuite('61 East Madison St. Chicago Ste 2000, NY 60603, US'), '61 East Madison St. Chicago # 2000, NY 60603, US');
        });
        it('Normalizing suite, should replace Ste. by #', function() {
            assert.equal(normalizeSuite('61 East Madison St. Chicago Ste. 2000, NY 60603, US'), '61 East Madison St. Chicago # 2000, NY 60603, US');
        });
        it('Normalizing suite, should return same string', function() {
            assert.equal(normalizeSuite('Antioquia'), 'Antioquia');
        });
    });
    describe('normalizeCompass', function() {
        it('Normalizing Compass should replace \'East South East\', by \'E SE\'', function() {
            assert.equal(normalizeCompass('61 East South East Madison St. ste 2000'), '61 E SE Madison St. ste 2000');
        });
        it('Normalizing Compass should replace \'s\', by \'S\'', function() {
            assert.equal(normalizeCompass('61 s Madison St. Ste 2000'), '61 S Madison St. Ste 2000');
        });
        it('Normalizing Compass should replace \'Northwest\', by \'NW\'', function() {
            assert.equal(normalizeCompass('61 Northwest Madison St. Ste. 2000'), '61 NW Madison St. Ste. 2000');
        });
        it('Normalizing suite, should return same string', function() {
            assert.equal(normalizeCompass('Antioquia'), 'Antioquia');
        });
    });
    describe('normalizeStreetType', function() {
        it('Normalizing Compass should replace \'St\', by \'st\'', function() {
            assert.equal(normalizeStreetType('61 East South East Madison St. ste 2000'), '61 East South East Madison st ste 2000');
        });
        it('Normalizing Compass should replace \'valley. valley\', by \'vly vly\'', function() {
            assert.equal(normalizeStreetType('61 s Madison valley. valley Ste 2000'), '61 s Madison vly vly Ste 2000');
        });
        it('Normalizing Compass should replace \'St.\', by \'st\'', function() {
            assert.equal(normalizeStreetType('61 Northwest Madison St. Ste. 2000'), '61 Northwest Madison st Ste. 2000');
        });
        it('Normalizing suite, should return same string', function() {
            assert.equal(normalizeStreetType('Antioquia'), 'Antioquia');
        });
    });
    describe('parseAddress', function() {
        it('should return a parse of the address', function fngetParseAddress(done) {
            parseAddress('7850 Collin Mckinney pkwy, Mckinney, West Virginia, 75070')
                .then(result => {
                    should.exist(result);
                    assert.isObject(result);
                    should.exist(result.street_address1);
                    should.exist(result.city);
                    should.exist(result.postal_code);
                    should.exist(result.state);
                    assert.propertyVal(result, 'street_address1', '7850collinmckinneypkwy');
                    assert.propertyVal(result, 'city', 'mckinney');
                    assert.propertyVal(result, 'state', 'WV');
                    assert.propertyVal(result, 'postal_code', '75070');
                    done();
                })
                .catch(err => {
                    should.not.exist(err);
                    done();
                });
        });
        it('should parse the state correctlry', function fngetParseAddress(done) {
            parseAddress('7850 Collin Mckinney pkwy, Mckinney, West Virginia 75070')
                .then(result => {
                    should.exist(result);
                    assert.isObject(result);
                    should.exist(result.street_address1);
                    should.exist(result.city);
                    should.exist(result.postal_code);
                    should.exist(result.state);
                    assert.propertyVal(result, 'street_address1', '7850collinmckinneypkwy');
                    assert.propertyVal(result, 'city', 'mckinney');
                    assert.propertyVal(result, 'state', 'WV');
                    assert.propertyVal(result, 'postal_code', '75070');
                    done();
                })
                .catch(err => {
                    should.not.exist(err);
                    done();
                });
        });
        it('should return a parse of the address, extracting the correct part of the postal code', function fngetParseAddress(done) {
            parseAddress('7850 Collin Mckinney pkwy, Mckinney, West Virginia, 75070-123412342314')
                .then(result => {
                    should.exist(result);
                    assert.isObject(result);
                    should.exist(result.street_address1);
                    should.exist(result.city);
                    should.exist(result.postal_code);
                    should.exist(result.state);
                    assert.propertyVal(result, 'street_address1', '7850collinmckinneypkwy');
                    assert.propertyVal(result, 'city', 'mckinney');
                    assert.propertyVal(result, 'state', 'WV');
                    assert.propertyVal(result, 'postal_code', '75070');
                    done();
                })
                .catch(err => {
                    should.not.exist(err);
                    done();
                });
        });
        it('should return a parse of the address without street', function fngetParseAddress(done) {
            parseAddress('Mckinney, Texas, 75070')
                .then(result => {
                    should.exist(result);
                    assert.isObject(result);
                    expect(result.street_address1).to.equal(null);
                    should.exist(result.city);
                    should.exist(result.postal_code);
                    should.exist(result.state);
                    assert.propertyVal(result, 'city', 'mckinney');
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
            parseAddress('nfo@TLCTransitionsAZ.com')
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
    describe('parseCanadaAddress', () => {
        it('should return a parse of canada address', function(done) {
            this.timeout(8000);
            parseAddress('7909 Flint Rd SE, Calgary AB T2H 1G3')
                .then(result => {
                    should.exist(result);
                    assert.isObject(result);
                    should.exist(result.street_address1);
                    should.exist(result.city);
                    should.exist(result.postal_code);
                    should.exist(result.state);
                    assert.propertyVal(result, 'street_address1', '7909flintrdSE');
                    assert.propertyVal(result, 'city', 'calgary');
                    assert.propertyVal(result, 'state', 'AB');
                    assert.propertyVal(result, 'postal_code', 't2h 1g3');
                    done();
                })
                .catch(err => {
                    should.not.exist(err);
                    done();
                });
        });
        it('should parse the canada province correctly', function fngetParseAddress(done) {
            parseAddress('2525 Woodview Dr SW suite #307, Calgary, alberta T2W 4N4')
                .then(result => {
                    should.exist(result);
                    assert.isObject(result);
                    should.exist(result.street_address1);
                    should.exist(result.city);
                    should.exist(result.postal_code);
                    should.exist(result.state);
                    assert.propertyVal(result, 'street_address1', '2525woodviewdrSW##307');
                    assert.propertyVal(result, 'city', 'calgary');
                    assert.propertyVal(result, 'state', 'AB');
                    assert.propertyVal(result, 'postal_code', 't2w 4n4');
                    done();
                })
                .catch(err => {
                    should.not.exist(err);
                    done();
                });
        });
        it('should return a parse of canada address, extracting the correct part of the postal code', function fngetParseAddress(done) {
            parseAddress('13307 King George Blvd, Surrey, BC, V3T2T3-qweqwe')
                .then(result => {
                    should.exist(result);
                    assert.isObject(result);
                    should.exist(result.street_address1);
                    should.exist(result.city);
                    should.exist(result.postal_code);
                    should.exist(result.state);
                    assert.propertyVal(result, 'street_address1', '13307kinggeorgeblvd');
                    assert.propertyVal(result, 'city', 'surrey');
                    assert.propertyVal(result, 'state', 'BC');
                    assert.propertyVal(result, 'postal_code', 'v3t2t3');
                    done();
                })
                .catch(err => {
                    should.not.exist(err);
                    done();
                });
        });
        it('should return a parse of canada address without street', function fngetParseAddress(done) {
            parseAddress('Lorette, MB')
                .then(result => {
                    should.exist(result);
                    assert.isObject(result);
                    expect(result.street_address1).to.equal(null);
                    should.exist(result.city);
                    should.exist(result.state);
                    assert.propertyVal(result, 'city', 'lorette');
                    assert.propertyVal(result, 'state', 'MB');
                    done();
                })
                .catch(err => {
                    should.not.exist(err);
                    done();
                });
        });
        it('should NOT return a parse of canada address', function fngetParseAddress(done) {
            parseAddress('nfo@TLCTransitionsAZ.com')
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
});