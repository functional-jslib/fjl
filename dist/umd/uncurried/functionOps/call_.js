(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/function_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/function_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.function_);
    global.call_ = mod.exports;
  }
})(this, function (exports, _function_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'call', {
    enumerable: true,
    get: function () {
      return _function_.call;
    }
  });
});