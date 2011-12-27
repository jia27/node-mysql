var common = require('../common');
var assert = require('assert');
var test   = require('utest');
var Client = require(common.dir.lib + '/Client');
var SqlString = require(common.dir.lib + '/SqlString');

var client;
test('Client', {
  before: function() {
    client = new Client();
  },

  '#escape is aliased to SqlString.escape': function() {
    assert.strictEqual(client.escape, SqlString.escape);
  },

  '#format() does not manipulate params parameter': function() {
    var sql = '?';
    var params = [1];

    client.format(sql, params);
    assert.equal(params.length, 1);
  },

  '#format() does not quote floats': function() {
    var params = [1.23];

    var sql = client.format('?', params);
    assert.strictEqual(sql, '1.23');
  },

  'Timeout reconnect works with empty queue': function() {
    // A non-error packet
    var packet = {};
    // This must not throw an error
    client._handlePacket(packet);
  },
});