(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../jsPlatform/array_', '../jsPlatform/function_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../jsPlatform/array_'), require('../jsPlatform/function_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.array_, global.function_);
    global.flip_ = mod.exports;
  }
})(this, function (exports, _array_, _function_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flip5 = exports.flip4 = exports.flip3 = exports.flipN = undefined;
  var

  /**
   * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
   * @function module:_functionOps.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = function flipN(fn) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _function_.apply)(fn, (0, _array_.reverse)(args));
    };
  },


  /**
   * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
   * @function module:_functionOps.flip3
   * @param fn {Function} - Function<a, b, c>
   * @returns {Function} - Function<c, b, a>
   */
  flip3 = exports.flip3 = function flip3(fn) {
    return function (a, b, c) {
      return (0, _function_.call)(fn, c, b, a);
    };
  },


  /**
   * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
   * @function module:_functionOps.flip4
   * @param fn {Function} - Function<a, b, c, d>
   * @returns {Function} - Function<d, c, b, a>
   */
  flip4 = exports.flip4 = function flip4(fn) {
    return function (a, b, c, d) {
      return (0, _function_.call)(fn, d, c, b, a);
    };
  },


  /**
   * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
   * @function module:_functionOps.flip5
   * @param fn {Function} - Function<a, b, c, d, e>
   * @returns {Function} - Function<e, d, c, b, a>
   */
  flip5 = exports.flip5 = function flip5(fn) {
    return function (a, b, c, d, e) {
      return (0, _function_.call)(fn, e, d, c, b, a);
    };
  },


  /**
   * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
   * @function module:_functionOps.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = function flip(fn) {
    return function (b, a) {
      return (0, _function_.call)(fn, a, b);
    };
  };
});