const should = require('chai').should();
const assert = require('chai').assert;
const {legacyClientToClient} = require('../lib/legacyClientToClient');
const client = require('../test/data_mock/client');
const legacyClient = require('../test/data_mock/legacyClient'); 

  // ============================================================================
  // test ecah of the functions used
  // ============================================================================
  describe('legacyClientToClient', () => {
    it('the legacyClientToClient should return structure client', function() {
      let result = legacyClientToClient(client);
      should.exist(result);
      assert.isObject(result);
    });
    it('the legacyClientToClient should return structure legacy to client', function() {
      let result = legacyClientToClient(legacyClient);
      should.exist(result);
      assert.isObject(result);
    });
    it('the legacyClientToClient should return the same structure as it received', function() {
      let result = legacyClientToClient({address:'356 AV', phone: '1111-1111-1111'});
      should.exist(result);
      assert.isObject(result);
      assert.propertyVal(result, 'address', '356 AV');
      assert.propertyVal(result, 'phone', '1111-1111-1111');
    });
  });