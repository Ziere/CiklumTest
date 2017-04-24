var assert = require('assert');
describe('Array', function() {
  describe('Correct settings', function() {
    it('should exist the env token', function() {
      assert.notEqual(process.env.token, undefined);
    });
  });
});