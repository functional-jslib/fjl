define(['exports', './function/curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fPureTakesOneOrMore = exports.fPureTakes5 = exports.fPureTakes4 = exports.fPureTakes3 = exports.fPureTakes2 = exports.fPureTakesOne = undefined;
  const

  /**
   * Returns a function that takes an argument and an object on which to execute 'method name'
   * with said parameters.
   * @function module:utils.fPureTakesOne
   * @param name {String}
   * @returns {Function}
   */
  fPureTakesOne = exports.fPureTakesOne = name => (0, _curry.curry)((arg, f) => f[name](arg)),


  /**
   * Returns a function that takes 2 arguments and an object on which to execute 'method name'
   * with said parameters.
   * @function module:utils.fPureTakes2
   * @param name {String}
   * @returns {Function}
   */
  fPureTakes2 = exports.fPureTakes2 = name => (0, _curry.curry)((arg1, arg2, f) => f[name](arg1, arg2)),


  /**
   * Returns a function that takes 3 arguments and an object on which to execute 'method name'
   * with said parameters.
   * @function module:utils.fPureTakes3
   * @param name {String}
   * @returns {Function}
   */
  fPureTakes3 = exports.fPureTakes3 = name => (0, _curry.curry)((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3)),


  /**
   * Returns a function that takes 4 arguments and an object on which to execute 'method name'
   * with said parameters.
   * @function module:utils.fPureTakes4
   * @param name {String}
   * @returns {Function}
   */
  fPureTakes4 = exports.fPureTakes4 = name => (0, _curry.curry)((arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4)),


  /**
   * Returns a function that takes 5 arguments and an object on which to execute 'method name'
   * with said parameters.
   * @function module:utils.fPureTakes5
   * @param name {String}
   * @returns {Function}
   */
  fPureTakes5 = exports.fPureTakes5 = name => (0, _curry.curry)((arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5)),


  /**
   * Returns a function that takes an object and one or more arguments on which to execute 'method name'
   * with said parameters.
   * @function module:utils.fPureTakesOneOrMore
   * @param name {String}
   * @returns {Function}
   */
  fPureTakesOneOrMore = exports.fPureTakesOneOrMore = name => (0, _curry.curry2)((f, ...args) => f[name](...args)); /**
                                                                                                                     * @module utils
                                                                                                                     */
});