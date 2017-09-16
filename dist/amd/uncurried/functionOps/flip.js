define(['exports', '../jsPlatform/arrayOpsUncurried', './apply', './call'], function (exports, _arrayOpsUncurried, _apply, _call) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flipN = undefined;
  const

  /**
   * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
   * @functionOps module:functionOps.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = fn => (...args) => (0, _apply.apply)(fn, (0, _arrayOpsUncurried.reverse)(args)),


  /**
   * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
   * @functionOps module:functionOps.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = fn => (b, a) => (0, _call.call)(fn, a, b);
});