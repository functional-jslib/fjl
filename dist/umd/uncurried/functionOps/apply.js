(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/functionUncurried'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/functionUncurried'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.functionUncurried);
    global.apply = mod.exports;
  }
})(this, function (exports, _functionUncurried) {
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