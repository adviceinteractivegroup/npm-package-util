'use strict';
const { expect} = require('chai');

const {
    getHours
} = require('../lib/hours');
const {
    basicHours,
    basicHoursWrongTimeFormat,
    incompleteRangeObject,
    basicHoursCloseDayLower,
    multipleHours,
    multipleHoursOverlapedWednesday,
    invalidOpenDayLabelHours,
    invalidCloseDayLabelHours,
    invalidFormat,
    reponseMultipleNotSplited,
    emptyHours
} = require('../test/data_mock/hours');

describe('hours', () => {
    describe('hours format', () => {
        it('No directory, should fail', () => {
            expect(() => getHours(basicHours)).to.throw('directory is required');
        });
        it('[], should fail by format', () => {
            expect(() => getHours([], 'google')).to.throw('Hours format Invalid');
        });
        it('{}, should fail by format', () => {
            expect(() => getHours({}, 'google')).to.throw('Hours format Invalid');
        });
        it('null, should fail by format', () => {
            expect(() => getHours(null, 'google')).to.throw('Hours format Invalid');
        });
        it('undefined, should fail by format', () => {
            expect(() => getHours(undefined, 'google')).to.throw('Hours format Invalid');
        });
        it('without predios, should fail by format', () => {
            expect(() => getHours(invalidFormat, 'google')).to.throw('Hours format Invalid');
        });
        it('empty hours array, should fail by format', () => {
            expect(() => getHours(emptyHours, 'google')).to.throw('Hours format Invalid');
        });
        it('wrong time format, should fail with two errors (28:00, 19:99)', () => {
            expect(() => getHours(basicHoursWrongTimeFormat, 'google')).to.throw('The closeTime "28:00" has invalid format, it must be (HH:MM); The closeTime "19:99" has invalid format, it must be (HH:MM); ');
        });
        it('invlid object format, should fail', () => {
            expect(() => getHours(incompleteRangeObject, 'google')).to.throw('"openTime" property is missing; "openDay" property is missing; The openDay "undefined" and closeDay "MONDAY" must be equal; The openDay "WEDNESDAY" and closeDay "MONDAY" must be equal; ');
        });
    });
    describe('getGoogleHours', () => {
        it('Basic hours, should return the same object', () => {
            expect(getHours(basicHours, 'google')).to.be.equal(basicHours);
        });
        it('Multiple hours, should return the same object', () => {
            expect(getHours(multipleHours, 'google')).to.be.equal(multipleHours);
        });
        it('Multiple overlaped hours, should fail', () => {
            expect(() => getHours(multipleHoursOverlapedWednesday, 'google')).to.throw('WEDNESDAY: 10:00 is between (08:00 - 11:00) range');
        });
        it('Basic hours, openTime > closeTime, should fail', () => {
            expect(() => getHours(basicHoursCloseDayLower, 'google')).to.throw('THURSDAY: The openTime 19:00 must not be higher than closeTime 08:00');
        });
        it('Basic hours, wrong open day label, should fail', () => {
            expect(() => getHours(invalidOpenDayLabelHours, 'google')).to.throw('The openDay "WEDNESDAYy" is invalid; ');
        });
        it('Basic hours, wrong close day label, should fail', () => {
            expect(() => getHours(invalidCloseDayLabelHours, 'google')).to.throw('The closeDay "FTIDAY" is invalid; ');
        });
    });
    describe('getOtherTemplatesHours', () => {
        it('Basic hours, should return the same object', () => {
            expect(getHours(basicHours, 'yelp')).to.be.eql(basicHours);
        });
        it('Multiple hours, should return one object by day', () => {
            expect(getHours(multipleHours, 'yelp')).to.be.eql(reponseMultipleNotSplited);
        });
        it('Multiple overlaped hours, should fail', () => {
            expect(() => getHours(multipleHoursOverlapedWednesday, 'yelp')).to.throw('WEDNESDAY: 10:00 is between (08:00 - 11:00) range');
        });
        it('Basic hours, openTime > closeTime, should fail', () => {
            expect(() => getHours(basicHoursCloseDayLower, 'yelp')).to.throw('THURSDAY: The openTime 19:00 must not be higher than closeTime 08:00');
        });
        it('Basic hours, wrong open day label, should fail', () => {
            expect(() => getHours(invalidOpenDayLabelHours, 'yelp')).to.throw('The openDay "WEDNESDAYy" is invalid; ');
        });
        it('Basic hours, wrong close day label, should fail', () => {
            expect(() => getHours(invalidCloseDayLabelHours, 'yelp')).to.throw('The closeDay "FTIDAY" is invalid; ');
        });
    });
});
