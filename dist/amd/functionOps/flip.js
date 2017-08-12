define(['exports', '../listOps/listOpsPrelude', './curry', './apply', './call'], function (exports, _listOpsPrelude, _curry, _apply, _call) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flipN = undefined;
  const

  /**
   * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
   * @functionOps module:fnOperators.flipN
   * @param fn {Function}
   * @returns {Function}
   */
  flipN = exports.flipN = fn => (0, _curry.curry3)((...args) => (0, _apply.apply)(fn, (0, _listOpsPrelude.reverse)(args))),


  /**
   * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
   * @functionOps module:fnOperators.flip
   * @param fn {Function}
   * @returns {Function}
   */
  flip = exports.flip = fn => (0, _curry.curry)((b, a) => (0, _call.call)(fn, a, b));
});