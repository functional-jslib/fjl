define(['exports', '../_jsPlatform/_function'], function (exports, _function) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.negateFMany = exports.negateP = exports.negateF5 = exports.negateF4 = exports.negateF3 = exports.negateF = undefined;
  const

  /**
   * Takes a function that takes two parameters and returns a negated version of given
   * function.
   * @function module:_negate.negateF
   * @param fn {Function}
   * @returns {Function}
   */
  negateF = exports.negateF = fn => (a, b) => !fn(a, b),


  /**
   * Takes a function that takes three parameters and returns a
   * negated version of given function.
   * @function module:_negate.negateF3
   * @param fn {Function}
   * @returns {Function}
   */
  negateF3 = exports.negateF3 = fn => (a, b, c) => !fn(a, b, c),


  /**
   * Takes a function that takes four parameters and returns a
   * negated version of given function.
   * @function module:_negate.negateF4
   * @param fn {Function}
   * @returns {Function}
   */
  negateF4 = exports.negateF4 = fn => (a, b, c, d) => !fn(a, b, c, d),


  /**
   * Takes a function that takes four parameters and returns a
   * negated version of given function.
   * @function module:_negate.negateF5
   * @param fn {Function}
   * @returns {Function}
   */
  negateF5 = exports.negateF5 = fn => (a, b, c, d, e) => !fn(a, b, c, d, e),


  /**
   * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
   * @function module:_function.negateP
   * @param fn {Function}
   * @returns {Function}
   */
  negateP = exports.negateP = negateF3,


  /**
   * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
   * @function module:_function.negateFMany
   * @param fn {Function}
   * @returns {Function}
   */
  negateFMany = exports.negateFMany = fn => (...args) => !(0, _function.apply)(fn, args); /**
                                                                                           * @memberOf _function
                                                                                           */
});