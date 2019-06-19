'use strict';
const should = require('chai').should();
const {
    assert,
    expect
} = require('chai');
const {
    getHours
} = require('../lib/hours');
const {
    basicHours,
    basicHoursWrongTime,
    multipleHours,
    multipleHoursOverlapedWednesday,
    invalidDaysLabel,
    invalidFormat
} = require('../test/data_mock/hours');

describe('hours', () => {
    describe('getGoogleHours', () => {
        it('Basic hours, should return the same object', () => {
            assert.equal(getHours(basicHours, 'google'), basicHours);
        });
    });
});
