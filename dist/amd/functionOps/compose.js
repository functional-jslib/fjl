define(['exports', '../listOps'], function (exports, _listOps) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.compose = undefined;


  /**
   * Composes all functions passed in from right to left passing each functions return value to
   * the functionOps on the left of itself.
   * @function module:functionOps.compose
   * @type {Function}
   * @param args {...Function}
   * @returns {Function}
   */
  const compose = exports.compose = (...args) => arg0 => (0, _listOps.foldr)((value, fn) => fn(value), arg0, args); /**
                                                                                                                     * @memberOf functionOps
                                                                                                                     */
});