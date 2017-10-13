define(['exports', '../jsPlatform/array_', '../jsPlatform/function_'], function (exports, _array_, _function_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flipN = undefined;
  const

  /**
   * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
   * @function module:functionOps_.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = fn => (...args) => (0, _function_.apply)(fn, (0, _array_.reverse)(args)),


  /**
   * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
   * @function module:functionOps_.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = fn => (b, a) => (0, _function_.call)(fn, a, b);
});