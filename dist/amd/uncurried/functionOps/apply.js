define(['exports', '../jsPlatform/functionOpsUncurried'], function (exports, _functionOpsUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'apply', {
    enumerable: true,
    get: function () {
      return _functionOpsUncurried.apply;
    }
  });
});