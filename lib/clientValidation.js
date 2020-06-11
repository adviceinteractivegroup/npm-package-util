'use strict';
const { default: Schema } = require('async-validator');
const { getHoursValidation } = require('./hours');
// const taxonomy = require('taxonomy');
// const util = require('util');
// require('util.promisify').shim();


const validateClient = (client) => {
  return new Promise((resolve, reject) => {
    // generic messages
    const genericValidatorMessage = (rule, val) => `-${val}- is not a valid ${rule.field}`;
    const genericForCountryValidatorMessage = (rule, val, ctx) => `-${val}- is not a valid ${rule.field} for ${ctx.country}`;
    const countryValidatorMessage = (rule, val, ctx) =>
      `-${ctx.country}- is not in the list of valid countries, so we can not validate the ${rule.field}`;

    // validators Country dependand
    const countrySensibleData = {
      US: {
        stateValidatorFunc: (rule, val, ctx) =>
          ['AA', 'AE', 'AP', 'DC', 'FM', 'AS', 'MH', 'MP', 'NC', 'ND', 'NH', 'NJ', 'NM', 'NY', 'PR', 'RI', 'SC', 'SD', 'VI', 'WV', 'AK',
            'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'GU', 'HI', 'IA', 'ID', 'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME',
            'MI', 'MN', 'MO', 'MS', 'MT', 'NE', 'NV', 'OH', 'OK', 'OR', 'PA', 'PW', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WY']
            .indexOf(val) > -1 ? true : new Error(genericForCountryValidatorMessage(rule, val, ctx)),
        // /^\(\d{3}\)\s\d{3}-\d{4}$/,
        phoneValidatorFunc: (rule, val, ctx) => !val || /^1?\D*(\d\D*){10}$/.test(val) ||
          new Error(genericForCountryValidatorMessage(rule, val, ctx)),
        zipcodeValidatorFunc: (rule, val, ctx) => /^[0-9]{5}(?:-[0-9]{4})?$/.test(val) ||
          new Error(genericForCountryValidatorMessage(rule, val, ctx))
      },
      CA: {
        stateValidatorFunc: (rule, val, ctx) => ['NL', 'PE', 'BC', 'NB', 'NT', 'NS', 'AB', 'MB', 'NU', 'ON', 'QC', 'SK', 'YT']
          .indexOf(val) > -1 ? true : new Error(genericForCountryValidatorMessage(rule, val, ctx)),
        phoneValidatorFunc: (rule, val, ctx) => !val || /^\D*(\d\D*){10}$/.test(val) ||
          new Error(genericForCountryValidatorMessage(rule, val, ctx)),
        zipcodeValidatorFunc: (rule, val, ctx) => /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/.test(val) ||
          new Error(genericForCountryValidatorMessage(rule, val, ctx))
      },
      CR: {
        stateValidatorFunc: () => true,
        phoneValidatorFunc: () => true,
        zipcodeValidatorFunc: () => true
      },
      GB: {},
      AU: {},
      BS: {},
      DE: {},
      NZ: {}
    };

    const countryValidatorFunc = (rule, val, ctx) => ctx.country &&
      typeof countrySensibleData[ctx.country] !== 'undefined' ||
      new Error(countryValidatorMessage(rule, val, ctx));
    const emailValidatorFunc = (rule, val, ctx) => !val ||
      /*eslint max-len: [2, 140, {"ignoreRegExpLiterals": true }]*/
      /^(?=[a-z\d@.!#$%&'*+\/=?^_`{|}~-]{6,254}$)(?=[a-z\d.!#$%&'*+\/=?^_`{|}~-]{1,64}@)[a-z\d!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+\/=?^_`{|}~-]+)*@(?:(?=[a-z\d-]{1,63}\.)[a-z\d](?:[a-z\d-]*[a-z\d])?\.)+(?=[a-z\d-]{1,63}$)[a-z\d](?:[a-z\d-]*[a-z\d])?$/i.test(val) ||
      new Error(genericValidatorMessage(rule, val, ctx));
    const websiteValidatorFunc = (rule, val, ctx) => !val ||
      // eslint-disable-next-line max-len
      // /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i.test(val) ||
      /^(http|https):\/\/[^ ']+$/i.test(val) ||
      new Error(genericValidatorMessage(rule, val, ctx));

    const hoursValidatorFunc = (rule, val, ctx) => {
      try {
        if (!val) {
          return true;
        }
        let validations = getHoursValidation(JSON.parse(val));
        if (validations.isValid) {
          return true;
        }
        return new Error(validations.error);
      } catch (e) {
        return new Error(genericValidatorMessage(rule, val, ctx));
      }
    };
    // const categoryValidatorFunc = val => {
    //   return new Promise((res, rej) => {
    //     const findTax = util.promisify(taxonomy.find);
    //     if (!val) {
    //       return true;
    //     }
    //     return findTax(`gcid:${val}`, 'google')
    //       .then(() => res(true))
    //       .catch(e => rej(e));
    //   });
    // };


    const legacyClientValidator = new Schema({
      // 'partner': 37921,
      // 'gmb_token': null,
      // 'id': 3541211,
      // 'gmb_location': null,
      // 'gmb_account': null,
      suite: { type: 'string', max: 32 },
      // 'addressExtraObject': {
      //   'district': '',
      //   'canton': ''
      // },
      // 'hoursObject': null,
      // 'hoursSpecialObject': null,
      // 'deleted': 'false',
      LAT: { type: 'number' },
      LON: { type: 'number' },
      // // 'status': 'Active',
      country: { type: 'enum', enum: Object.keys(countrySensibleData) },
      // 'orders': 41,
      // 'extra': '',
      name: { type: 'string', required: true, min: 3, max: 128 },
      // 'owner': 'Lewis Shaefer',
      // 'partnerUsername': 'ValleyYellowPages@lssdev.com',
      street: { type: 'string', required: true, max: 128 },
      hours: {
        type: 'string',
        validator: (rule, value, callback, source) => hoursValidatorFunc(rule, value, source)
      },
      city: { type: 'string', required: true, max: 128 },
      state: [
        { type: 'string', required: true, max: 64 },
        { validator: (rule, value, callback, source) => countryValidatorFunc(rule, value, source) },
        {
          validator: (rule, value, callback, source) =>
            (countrySensibleData[source.country].stateValidatorFunc || (() => true))(rule, value, source)
        }
      ],
      zipcode: [
        { type: 'string', required: true, max: 32 },
        { validator: (rule, value, callback, source) => countryValidatorFunc(rule, value, source) },
        {
          validator: (rule, value, callback, source) =>
            (countrySensibleData[source.country].zipcodeValidatorFunc || (() => true))(rule, value, source)
        }
      ],
      phone: [
        { type: 'string', required: true, max: 32 },
        { validator: (rule, value, callback, source) => countryValidatorFunc(rule, value, source) },
        {
          validator: (rule, value, callback, source) =>
            (countrySensibleData[source.country].phoneValidatorFunc || (() => true))(rule, value, source)
        }
      ],
      phoneAlt: [
        { type: 'string', max: 32 },
        { validator: (rule, value, callback, source) => countryValidatorFunc(rule, value, source) },
        {
          validator: (rule, value, callback, source) =>
            (countrySensibleData[source.country].phoneValidatorFunc || (() => true))(rule, value, source)
        }
      ],
      fax: [
        { type: 'string', max: 32 },
        { validator: (rule, value, callback, source) => countryValidatorFunc(rule, value, source) },
        {
          validator: (rule, value, callback, source) =>
            (countrySensibleData[source.country].phoneValidatorFunc || (() => true))(rule, value, source)
        }
      ],
      website: {
        type: 'string',
        max: 255,
        validator: (rule, value, callback, source) => websiteValidatorFunc(rule, value, source)
      },
      email: {
        type: 'string',
        required: true,
        max: 128,
        validator: (rule, value, callback, source) => emailValidatorFunc(rule, value, source)
      },
      emailPrivate: {
        type: 'string',
        max: 128,
        validator: (rule, value, callback, source) => emailValidatorFunc(rule, value, source)
      },
      facebook: { type: 'string', max: 255 },
      twitter: { type: 'string', max: 255 },
      linkedin: { type: 'string', max: 255 },
      years: { type: 'string', len: 4 },
      description: { type: 'string', min: 200, max: 750 },
      payment: { type: 'string', max: 255 },
      services: { type: 'string', max: 255 },
      license: { type: 'string', max: 64 },
      // 'keyword1': 'Antique Clocks',
      // 'keyword2': 'Clock Restoration',
      // 'keyword3': 'Clock Repair',
      // 'keyword4': 'Pocket Watches',
      // 'keyword5': 'Collectable Pottery',
      // 'keyword1_location': 'Aptos',
      // 'keyword2_location': 'Soquel',
      // 'keyword3_location': 'Capitola',
      // 'keyword4_location': 'Santa Cruz',
      // 'keyword5_location': 'Boulder Creek',
      notes: {},
      hide: { type: 'enum', enum: [null, '', 'true', 'false', true, false] }
      // 'isInactive': false,
      // 'custom1': '732813',
      // 'custom2': 'SANC',
      // 'custom3': '',
      // 'custom4': '',
      // 'custom5': '',
      // 'ordersTotal': 45,
      // categoryGoogle: {
      //   type: 'string',
      //   asyncValidator: (rule, value, callback, source) => categoryValidatorFunc(value, source)
      //     .then(() => Promise.resolve(true))
      //     .catch(error => Promise.reject(error))
      // }
    });

    let cn = {
      required(x) {
        return `${x} can not be emptys`;
      }
      // types: {
      //   number: (...args) => {
      //     console.log(args);
      //     return 'hola a todos';
      //   }
      // }  
    };
    legacyClientValidator.messages(cn);
    legacyClientValidator
      .validate(client, { firstFields: true })
      .then(() => resolve(true))
      .catch(({ errors }) => reject(errors));
  });
};

module.exports = {
  validateClient
};
