define(['exports', '../jsPlatform/function', './curry'], function (exports, _function, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.negateFN = exports.negateF3 = exports.negateF2 = exports.negateF = undefined;
  /**
   * @memberOf function
   */

  const

  /**
   * Negates a function that takes one/no argument.
   * @function module:function.negateF
   * @param fn {Function}
   * @returns {function(*=): boolean}
   */
  negateF = exports.negateF = fn => x => !fn(x),


  /**
   * Takes a function that takes two parameters and returns a negated version of given
   * function.
   * @function module:_negate.negateF2
   * @param fn {Function}
   * @returns {Function}
   */
  negateF2 = exports.negateF2 = fn => (0, _curry.curry)((a, b) => !fn(a, b)),


  /**
   * Takes a function that takes three parameters and returns a
   * negated version of given function.
   * @function module:_negate.negateF3
   * @param fn {Function}
   * @returns {Function}
   */
  negateF3 = exports.negateF3 = fn => (0, _curry.curry)((a, b, c) => !fn(a, b, c)),


  /**
   * Returns a negated version of given function.
   * Returned function is variadiac (takes one or more arguments).
   * @note function returned is uncurried.
   * @uncurried
   * @function module:function.negateFN
   * @param fn {Function}
   * @returns {Function}
   */
  negateFN = exports.negateFN = fn => (...args) => !(0, _function.apply)(fn, args);
});