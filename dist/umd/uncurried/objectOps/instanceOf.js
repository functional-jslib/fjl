(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/objectUncurried'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/objectUncurried'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectUncurried);
    global.instanceOf = mod.exports;
  }
})(this, function (exports, _objectUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'instanceOf', {
    enumerable: true,
    get: function () {
      return _objectUncurried.instanceOf;
    }
  });
});