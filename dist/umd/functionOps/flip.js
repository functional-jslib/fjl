(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/array', '../uncurried/functionOps_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/array'), require('../uncurried/functionOps_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.array, global.functionOps_);
    global.flip = mod.exports;
  }
})(this, function (exports, _array, _functionOps_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flipN = undefined;
  /**
   * @memberOf functionOps
   */
  var

  /**
   * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
   * @function module:fnOperators.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = function flipN(fn) {
    return (0, _functionOps_.curry3)(function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _functionOps_.apply)(fn, (0, _array.reverse)(args));
    });
  },


  /**
   * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
   * @function module:fnOperators.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = function flip(fn) {
    return (0, _functionOps_.curry)(function (b, a) {
      return (0, _functionOps_.call)(fn, a, b);
    });
  };
});