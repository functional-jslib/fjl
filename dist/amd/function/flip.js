define(['exports', '../jsPlatform/array', '../jsPlatform/function', './curry'], function (exports, _array, _function, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flipN = undefined;
  const

  /**
   * Returns a curried function requiring given functions arguments in reverse
   * (returned function expects 2 or more variables (curried at 2 or more args)).
   * @function module:function.flipN
   * @param fn {Function}
   * @returns {Function}
   * @curried
   */
  flipN = exports.flipN = fn => (0, _curry.curry2)((...args) => (0, _function.apply)(fn, (0, _array.reverse)(args))),


  /**
   * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
   * @function module:function.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = fn => (0, _curry.curry)((b, a) => (0, _function.call)(fn, a, b));
});