define(['exports', '../_jsPlatform/_array', '../_jsPlatform/_function'], function (exports, _array, _function) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flip5 = exports.flip4 = exports.flip3 = exports.flipN = undefined;
  const

  /**
   * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
   * @function module:_function.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = fn => (...args) => (0, _function.apply)(fn, (0, _array.reverse)(args)),


  /**
   * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
   * @function module:_function.flip3
   * @param fn {Function} - Function<a, b, c>
   * @returns {Function} - Function<c, b, a>
   */
  flip3 = exports.flip3 = fn => (a, b, c) => (0, _function.call)(fn, c, b, a),


  /**
   * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
   * @function module:_function.flip4
   * @param fn {Function} - Function<a, b, c, d>
   * @returns {Function} - Function<d, c, b, a>
   */
  flip4 = exports.flip4 = fn => (a, b, c, d) => (0, _function.call)(fn, d, c, b, a),


  /**
   * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
   * @function module:_function.flip5
   * @param fn {Function} - Function<a, b, c, d, e>
   * @returns {Function} - Function<e, d, c, b, a>
   */
  flip5 = exports.flip5 = fn => (a, b, c, d, e) => (0, _function.call)(fn, e, d, c, b, a),


  /**
   * Flips a _function's first and second arguments and and returns a new _function requiring said arguments in reverse.
   * @function module:_function.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = fn => (b, a) => (0, _function.call)(fn, a, b);
});