define(['exports', '../jsPlatform/array', '../uncurried/functionOps_'], function (exports, _array, _functionOps_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flipN = undefined;
  /**
   * @memberOf functionOps
   */
  const

  /**
   * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
   * @function module:fnOperators.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = fn => (0, _functionOps_.curry3)((...args) => (0, _functionOps_.apply)(fn, (0, _array.reverse)(args))),


  /**
   * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
   * @function module:fnOperators.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = fn => (0, _functionOps_.curry)((b, a) => (0, _functionOps_.call)(fn, a, b));
});