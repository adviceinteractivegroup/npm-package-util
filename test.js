'use strict';
const { validateClient } = require('./lib/clientValidation');

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
  'zipcode': '95003',
  'state': '123',
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
validateClient(client)
.then(result => {
  console.log("what");
  console.log(result);
})
.catch(err => {
  console.log("error");
  console.log(err);
});
