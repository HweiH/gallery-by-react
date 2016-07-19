/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

var _shallowRenderHelper = require('helpers/shallowRenderHelper');

var _shallowRenderHelper2 = _interopRequireDefault(_shallowRenderHelper);

var _Main = require('components/Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('MainComponent', function () {
  var MainComponent = void 0;

  beforeEach(function () {
    MainComponent = (0, _shallowRenderHelper2.default)(_Main2.default);
  });

  it('should have its component name as default className', function () {
    expect(MainComponent.props.className).to.equal('index');
  });
});

//# sourceMappingURL=MainTest-compiled.js.map