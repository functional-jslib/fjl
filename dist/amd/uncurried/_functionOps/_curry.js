define(['exports', '../_jsPlatform', '../_utils'], function (exports, _jsPlatform, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.curryN = exports.curry = undefined;
  /**
   * @author elydelacruz
   * @created 12/6/2016.
   * @memberOf _functionOps
   * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
   */
  const notFnErrPrefix = '`fn` in `curry(fn, ...args)`';

  const

  /**
   * Curries a functionOps based on it's defined arity (argument's arrayOps expected length).
   * @function module:_functionOps.curry
   * @param fn {Function}
   * @param argsToCurry {...*}
   * @returns {Function}
   */
  curry = exports.curry = (fn, ...argsToCurry) => curryN((0, _utils.fnOrError)(notFnErrPrefix, fn).length, fn, ...argsToCurry),


  /**
   * Curries a functionOps up to a given arity.
   * @function module:_functionOps.curryN
   * @param executeArity {Number}
   * @param fn {Function}
   * @param curriedArgs {...*}
   * @returns {Function}
   */
  curryN = exports.curryN = (executeArity, fn, ...curriedArgs) => {
    return (...args) => {
      let concatedArgs = (0, _jsPlatform.concat)(curriedArgs, args),
          canBeCalled = (0, _jsPlatform.length)(concatedArgs) >= executeArity || !executeArity;
      return !canBeCalled ? (0, _jsPlatform.apply)(curryN, (0, _jsPlatform.concat)([executeArity, (0, _utils.fnOrError)(notFnErrPrefix, fn)], concatedArgs)) : (0, _jsPlatform.apply)((0, _utils.fnOrError)(notFnErrPrefix, fn), concatedArgs);
    };
  },


  /**
   * Curries a _functionOps up to an arity of 2 (won't call _functionOps until 2 or more args).
   * @function module:_functionOps.curry2
   * @param fn {Function}
   * @returns {Function}
   */
  curry2 = exports.curry2 = fn => curryN(2, fn),


  /**
   * Curries a _functionOps up to an arity of 3 (won't call _functionOps until 3 or more args).
   * @function module:_functionOps.curry3
   * @param fn {Function}
   * @returns {Function}
   */
  curry3 = exports.curry3 = fn => curryN(3, fn),


  /**
   * Curries a _functionOps up to an arity of 4 (won't call _functionOps until 4 or more args).
   * @function module:_functionOps.curry4
   * @param fn {Function}
   * @returns {Function}
   */
  curry4 = exports.curry4 = fn => curryN(4, fn),


  /**
   * Curries a _functionOps up to an arity of 5 (won't call _functionOps until 5 or more args).
   * @function module:_functionOps.curry5
   * @param fn {Function}
   * @returns {Function}
   */
  curry5 = exports.curry5 = fn => curryN(5, fn);
});