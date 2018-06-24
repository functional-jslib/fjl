'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.negateFMany = exports.negateP = exports.negateF5 = exports.negateF4 = exports.negateF3 = exports.negateF = undefined;

var _function = require('../jsPlatform/function');

var _curry = require('./curry');

/**
 * @memberOf function
 */

var

/**
 * Takes a function that takes two parameters and returns a negated version of given
 * function.
 * @function module:_negate.negateF
 * @param fn {Function}
 * @returns {Function}
 */
negateF = exports.negateF = function negateF(fn) {
  return (0, _curry.curry)(function (a, b) {
    return !fn(a, b);
  });
},


/**
 * Takes a function that takes three parameters and returns a
 * negated version of given function.
 * @function module:_negate.negateF3
 * @param fn {Function}
 * @returns {Function}
 */
negateF3 = exports.negateF3 = function negateF3(fn) {
  return (0, _curry.curry)(function (a, b, c) {
    return !fn(a, b, c);
  });
},


/**
 * Takes a function that takes four parameters and returns a
 * negated version of given function.
 * @function module:_negate.negateF4
 * @param fn {Function}
 * @returns {Function}
 */
negateF4 = exports.negateF4 = function negateF4(fn) {
  return (0, _curry.curry)(function (a, b, c, d) {
    return !fn(a, b, c, d);
  });
},


/**
 * Takes a function that takes four parameters and returns a
 * negated version of given function.
 * @function module:_negate.negateF5
 * @param fn {Function}
 * @returns {Function}
 */
negateF5 = exports.negateF5 = function negateF5(fn) {
  return (0, _curry.curry)(function (a, b, c, d, e) {
    return !fn(a, b, c, d, e);
  });
},


/**
 * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
 * @function module:function.negateP
 * @param fn {Function}
 * @returns {Function}
 */
negateP = exports.negateP = negateF3,


/**
 * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
 * The return function is variadic (or accepts one or more arguments (and isn't curried)).
 * @function module:function.negateFMany
 * @param fn {Function}
 * @returns {Function}
 */
negateFMany = exports.negateFMany = function negateFMany(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !(0, _function.apply)(fn, args);
  };
};