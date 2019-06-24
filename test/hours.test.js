'use strict';
const chai = require('chai');
const {
    expect
} = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

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
        it('No directory, should fail', async () => {
            await getHours(basicHours).should.be.rejectedWith('directory is required');
        });
        it('[], should fail by format', async () => {
            await getHours([], 'google').should.be.rejectedWith('Hours format Invalid');
        });
        it('{}, should fail by format', async () => {
            await getHours({}, 'google').should.be.rejectedWith('Hours format Invalid');
        });
        it('null, should fail by format', async () => {
            await getHours(null, 'google').should.be.rejectedWith('Hours format Invalid');
        });
        it('undefined, should fail by format', async () => {
            await getHours(undefined, 'google').should.be.rejectedWith('Hours format Invalid');
        });
        it('without predios, should fail by format', async () => {
            await getHours(invalidFormat, 'google').should.be.rejectedWith('Hours format Invalid');
        });
        it('empty hours array, should fail by format', async () => {
            await getHours(emptyHours, 'google').should.be.rejectedWith('Hours format Invalid');
        });
        it('wrong time format, should fail with two errors (28:00, 19:99)', async () => {
            await getHours(basicHoursWrongTimeFormat, 'google').should.be.rejectedWith('The closeTime "28:00" has invalid format, it must be (HH:MM); The closeTime "19:99" has invalid format, it must be (HH:MM); ');
        });
        it('invlid object format, should fail', async () => {
            await getHours(incompleteRangeObject, 'google').should.be.rejectedWith('"openTime" property is missing; "openDay" property is missing; The openDay "undefined" and closeDay "MONDAY" must be equal; The openDay "WEDNESDAY" and closeDay "MONDAY" must be equal; ');
        });
    });
    describe('getGoogleHours', () => {
        it('Basic hours, should return the same object', async () => {
            const result = await getHours(basicHours, 'google');
            expect(result).to.be.equal(basicHours);
        });
        it('Multiple hours, should return the same object', async () => {
            const result = await getHours(multipleHours, 'google');
            expect(result).to.be.equal(multipleHours);
        });
        it('Multiple overlaped hours, should fail', async () => {
            await getHours(multipleHoursOverlapedWednesday, 'google').should.be.rejectedWith('WEDNESDAY: 10:00 is between (08:00 - 11:00) range');
        });
        it('Basic hours, openTime > closeTime, should fail', async () => {
            await getHours(basicHoursCloseDayLower, 'google').should.be.rejectedWith('THURSDAY: The openTime 19:00 must not be higher than closeTime 08:00');
        });
        it('Basic hours, wrong open day label, should fail', async () => {
            await getHours(invalidOpenDayLabelHours, 'google').should.be.rejectedWith('The openDay "WEDNESDAYy" is invalid; ');
        });
        it('Basic hours, wrong close day label, should fail', async () => {
            await getHours(invalidCloseDayLabelHours, 'google').should.be.rejectedWith('The closeDay "FTIDAY" is invalid; ');
        });
    });
    describe('getOtherTemplatesHours', () => {
        it('Basic hours, should return the same object', async () => {
            const result = await getHours(basicHours, 'yelp');
            expect(result).to.be.eql(basicHours);
        });
        it('Multiple hours, should return one object by day', async () => {
            const result = await getHours(multipleHours, 'yelp');
            expect(result).to.be.eql(reponseMultipleNotSplited);
        });
        it('Multiple overlaped hours, should fail', async () => {
            await getHours(multipleHoursOverlapedWednesday, 'yelp').should.be.rejectedWith('WEDNESDAY: 10:00 is between (08:00 - 11:00) range');
        });
        it('Basic hours, openTime > closeTime, should fail', async () => {
            await getHours(basicHoursCloseDayLower, 'yelp').should.be.rejectedWith('THURSDAY: The openTime 19:00 must not be higher than closeTime 08:00');
        });
        it('Basic hours, wrong open day label, should fail', async () => {
            await getHours(invalidOpenDayLabelHours, 'yelp').should.be.rejectedWith('The openDay "WEDNESDAYy" is invalid; ');
        });
        it('Basic hours, wrong close day label, should fail', async () => {
            await getHours(invalidCloseDayLabelHours, 'yelp').should.be.rejectedWith('The closeDay "FTIDAY" is invalid; ');
        });
    });
});
