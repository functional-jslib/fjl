define(['exports', '../jsPlatform/functionUncurried'], function (exports, _functionUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'apply', {
    enumerable: true,
    get: function () {
      return _functionUncurried.apply;
    }
  });
});