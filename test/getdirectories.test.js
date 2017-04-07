'use strict';
const assert = require('chai').assert;
const should = require('chai').should();
const util = require('../index');

describe('getDirectories', function () {
  let rows = require('./getDirectories');
  
  it("getDirectories should return a total rows and directories", function (done) {
    util.getDirectories(rows)
      .then(function (result) {
        should.exist(result);
        assert.isObject(result);
        should.exist(result.rows);
        assert.equal(result.rows, rows);
        should.exist(result.directories);
        assert.isArray(result.directories);
        assert.isAtLeast(result.directories.length,1);
        assert.isString(result.directories[0]);
        done();
      })
      .catch(function (err) {
        should.not.exist(err);
        done();
      });
  });
  
  it("getDirectories should return an error when dont sent a correct array for rows", function (done) {
    util.getDirectories('a')
      .then(function (result) {
        should.not.exist(result);
        done();
      })
      .catch(function (err) {
        should.exist(err);
        assert.isObject(err);
        assert.property(err, 'message');
        assert.equal(err.message, 'No directories to filter');
        done();
      });
  });
});
