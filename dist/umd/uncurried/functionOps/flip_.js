(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/array_', './apply_', './call_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/array_'), require('./apply_'), require('./call_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.array_, global.apply_, global.call_);
    global.flip_ = mod.exports;
  }
})(this, function (exports, _array_, _apply_, _call_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flipN = undefined;
  var

  /**
   * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
   * @function module:functionOps_.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = function flipN(fn) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _apply_.apply)(fn, (0, _array_.reverse)(args));
    };
  },


  /**
   * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
   * @function module:functionOps_.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = function flip(fn) {
    return function (b, a) {
      return (0, _call_.call)(fn, a, b);
    };
  };
});