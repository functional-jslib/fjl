define(['exports', '../jsPlatform/functionOpsUncurried'], function (exports, _functionOpsUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'call', {
    enumerable: true,
    get: function () {
      return _functionOpsUncurried.call;
    }
  });
});