(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/functionOpsUncurried'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/functionOpsUncurried'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.functionOpsUncurried);
    global.apply = mod.exports;
  }
})(this, function (exports, _functionOpsUncurried) {
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