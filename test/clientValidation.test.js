'use strict';
const assert = require('chai').assert;
const expect = require('chai').expect
const should = require('chai').should();
const { validateClient } = require('../lib/clientValidation');

let client = {
  'partner': 37921,
  'gmb_token': null,
  'id': 3541211,
  'gmb_location': null,
  'gmb_account': null,
  'suite': '',
  'addressExtraObject': {
    'district': '',
    'canton': ''
  },
  'hoursObject': null,
  'hoursSpecialObject': null,
  'deleted': 'false',
  'LAT': 19.234234,
  'LON': 54.234,
  'status': 'Active',
  'country': 'US',
  'orders': 41,
  'extra': '',
  'name': 'Antique Clocks of Santa Cruz',
  'owner': 'Lewis Shaefer',
  'partnerUsername': 'ValleyYellowPages@lssdev.com',
  'street': '8045 Soquel Drive',
  'hours':
    JSON.stringify({
      periods: [{
        openDay: 'MONDAY',
        openTime: '08:00',
        closeDay: 'MONDAY',
        closeTime: '09:00'
      },
      {
        openDay: 'TUESDAY',
        openTime: '08:00',
        closeDay: 'TUESDAY',
        closeTime: '19:00'
      },
      {
        openDay: 'WEDNESDAY',
        openTime: '08:00',
        closeDay: 'WEDNESDAY',
        closeTime: '19:00'
      },
      {
        openDay: 'THURSDAY',
        openTime: '08:00',
        closeDay: 'THURSDAY',
        closeTime: '19:00'
      },
      {
        openDay: 'FRIDAY',
        openTime: '08:00',
        closeDay: 'FRIDAY',
        closeTime: '09:00'
      },
      {
        openDay: 'SATURDAY',
        openTime: '08:00',
        closeDay: 'SATURDAY',
        closeTime: '19:00'
      },
      {
        openDay: 'SUNDAY',
        openTime: '08:00',
        closeDay: 'SUNDAY',
        closeTime: '19:00'
      }
      ]
    }),
  'city': 'Aptos',
  'state': 'CA',
  'zipcode': '95003',
  'phone': '1 234 567 8099',
  'phoneAlt': null,
  'fax': '',
  'website': '',
  'email': '',
  'emailPrivate': 'susan.kuslis@sbcglobal.net',
  'facebook': '',
  'twitter': '',
  'linkedin': '',
  'years': '1999',
  'description': 'Antique Clocks of Santa Cruz sells, restores and repairs antique clocks and unique clocks.  ' +
    'There are one-of-a-kind items.  We also have a great collection of vintage pottery and garden pieces. ' +
    'This is an owner-operated business with over 50 years of experience. It is time to reduce inventory. ' +
    'We are offering drastically reduced prices. All reasonable offers will be considered.  All clocks are warranteed for one year.',
  'payment': '',
  'services': 'Antique Clocks, Cuckoo Clocks, Grandfather Clocks, Unusual Clocks.Clock Repair,',
  'license': '',
  'keyword1': 'Antique Clocks',
  'keyword2': 'Clock Restoration',
  'keyword3': 'Clock Repair',
  'keyword4': 'Pocket Watches',
  'keyword5': 'Collectable Pottery',
  'keyword1_location': 'Aptos',
  'keyword2_location': 'Soquel',
  'keyword3_location': 'Capitola',
  'keyword4_location': 'Santa Cruz',
  'keyword5_location': 'Boulder Creek',
  'notes': '',
  'hide': false,
  'isInactive': false,
  'createdAt': '2019-07-17T03:25:58.000Z',
  'deletedAt': null,
  'inactiveAt': null,
  'custom1': '732813',
  'custom2': 'SANC',
  'custom3': '',
  'custom4': '',
  'custom5': '',
  'ordersTotal': 45,
  'publicKey': '153630f420a5d6aba3dc4169195257fc',
  'categoryGoogle': 'antique_store',
  'transactionId': '172fa74f-3e14-4100-8f60-7327864d3064'
};




describe('clientValidation', function () {
  it('should return true', done => {
    let clientCopy = JSON.parse(JSON.stringify(client));
    validateClient(clientCopy)
      .then(result => {
        should.exist(result);
        assert.equal(result, true);
        done();
      })
      .catch(err => {
        should.not.exist(err);
        done();
      });
  });
  it('should reject with error, hours format not valid', done => {
    let clientCopy = JSON.parse(JSON.stringify(client));
    clientCopy.hours = 'asdfsbs',
      validateClient(clientCopy)
        .then(result => {
          should.not.exist(result);
          done();
        })
        .catch(err => {
          expect(err).to.be.deep.eql(
            [{ message: '-asdfsbs- is not a valid hours', field: 'hours' }]
          );
          done();
        });
  });
  it('should reject with error, Could not find gcid', done => {
    let clientCopy = JSON.parse(JSON.stringify(client));
    clientCopy.categoryGoogle = 'wrong',
      validateClient(clientCopy)
        .then(result => {
          should.not.exist(result);
          done();
        })
        .catch(err => {
          expect(err).to.be.deep.eql(
            [{
              message: 'Could not find gcid: "gcid:wrong"',
              field: 'categoryGoogle'
            }]
          );
          done();
        });
  });
  it('should reject with error, not valid phone for that country', done => {
    let clientCopy = JSON.parse(JSON.stringify(client));
    clientCopy.phone = '12345678',
      validateClient(clientCopy)
        .then(result => {
          should.not.exist(result);
          done();
        })
        .catch(err => {
          expect(err).to.be.deep.eql(
            [{
              message: '-12345678- is not a valid phone for US',
              field: 'phone'
            }]
          );
          done();
        });
  });
  it('should reject with error, not valid email', done => {
    let clientCopy = JSON.parse(JSON.stringify(client));
    clientCopy.email = 'some@email.com..',
      validateClient(clientCopy)
        .then(result => {
          should.not.exist(result);
          done();
        })
        .catch(err => {
          expect(err).to.be.deep.eql(
            [{
              message: '-some@email.com..- is not a valid email',
              field: 'email'
            }]
          );
          done();
        });
  });
  it('should reject with several errors due to incorrect country', done => {
    let clientCopy = JSON.parse(JSON.stringify(client));
    clientCopy.country = 'UsA',
      validateClient(clientCopy)
        .then(result => {
          should.not.exist(result);
          done();
        })
      .catch(err => {
          expect(err).to.be.deep.eql(
            [{
              message: 'country must be one of US, CA, CR, GB, AU, BS, DE, NZ',
              field: 'country'
            },
              {
                message: '-UsA- is not in the list of valid countries, so we can not validate the state',
                field: 'state'
              },
              {
                message: '-UsA- is not in the list of valid countries, so we can not validate the zipcode',
                field: 'zipcode'
              },
              {
                message: '-UsA- is not in the list of valid countries, so we can not validate the phone',
                field: 'phone'
              },
              {
                message: '-UsA- is not in the list of valid countries, so we can not validate the phoneAlt',
                field: 'phoneAlt'
              },
              {
                message: '-UsA- is not in the list of valid countries, so we can not validate the fax',
                field: 'fax'
              }]
          );
          done();
        });
  });
});
  
