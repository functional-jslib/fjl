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
    global.apply_ = mod.exports;
  }
})(this, function (exports, _function_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'apply', {
    enumerable: true,
    get: function () {
      return _function_.apply;
    }
  });
});