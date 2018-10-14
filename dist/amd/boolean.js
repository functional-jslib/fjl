define(['exports', './function/curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.equalAll = exports.equal = exports.alwaysFalse = exports.alwaysTrue = exports.isFalsy = exports.isTruthy = undefined;
  const

  /**
   * Returns whether `value` is 'truthy' or not
   * @function module:boolean.isTruthy
   * @param value
   * @returns {Boolean}
   */
  isTruthy = exports.isTruthy = value => !!value,


  /**
   * Returns whether `value` is 'falsy' or not
   * @function module:boolean.isFalsy
   * @param value
   * @returns {Boolean}
   */
  isFalsy = exports.isFalsy = value => !value,


  /**
   * Returns `true`.
   * @function module:boolean.alwaysTrue
   * @returns {Boolean}
   */
  alwaysTrue = exports.alwaysTrue = () => true,


  /**
   * Returns `false`.
   * @function module:boolean.alwaysFalse
   * @returns {Boolean}
   */
  alwaysFalse = exports.alwaysFalse = () => false,


  /**
   * Equality operator.
   * @function module:boolean.equal
   * @param a {*}
   * @param b {*}
   * @returns {boolean}
   */
  equal = exports.equal = (0, _curry.curry)((a, b) => a === b),


  /**
   * Equality operator for all.
   * @function module:boolean.equalAll
   * @param a {*} - Item `0`.
   * @param args {...*} - Others
   * @returns {boolean}
   */
  equalAll = exports.equalAll = (0, _curry.curry2)((a, ...args) => args.every(b => equal(a, b))); /**
                                                                                                   * @module boolean
                                                                                                   * @description Contains functional version of 'always-true', 'always-false', 'is-truthy', and 'is-falsy'.
                                                                                                   */
});