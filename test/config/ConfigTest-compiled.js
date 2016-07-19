/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('appEnvConfigTests', function () {
  it('should load app config file depending on current --env', function () {
    expect(_config2.default.appEnv).to.equal('test');
  });
});

//# sourceMappingURL=ConfigTest-compiled.js.map