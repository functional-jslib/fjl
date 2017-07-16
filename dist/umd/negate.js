(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './is'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./is'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.is);
    global.negate = mod.exports;
  }
})(this, function (module, exports, _is) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (x) {
    return (0, _is.isFunction)(x) ? function (value) {
      return !x(value);
    } : x * -1;
  };

  module.exports = exports['default'];
});