const assert = require('assert');

  describe('Correct settings', function() {
    it('should exist the env token', function() {
      assert.notEqual(process.env.token, undefined);
    });
  });

  describe('Accepting user from command line', function() {
    const processCommandLine = require('./processCommandLine'); 
    it(`Array with ['Hello world', 'user=Ziere'] must return Ziere`, function() {
      let testCommand = processCommandLine(['Hello world', 'user=Ziere']);
      assert.equal(testCommand, 'Ziere');      
      assert.notEqual(testCommand, undefined);
    });
    it(`Array with ['Hello world', 'Command_1'] must undefined`, function() {
      let testCommand = processCommandLine(['Hello world', 'Command_1']);
      assert.equal(testCommand, undefined);
    });
    it('String without match', function() {
      let testCommand = processCommandLine('Hello world');
      assert.equal(testCommand, undefined);
    });
    it('String with match', function() {
      let testCommand = processCommandLine('user=Facebook');
      assert.equal(testCommand, 'Facebook');
    });
  });
