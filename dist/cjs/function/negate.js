'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.negateFN = exports.negateF3 = exports.negateF2 = exports.negateF = undefined;

var _function = require('../jsPlatform/function');

var _curry = require('./curry');

/**
 * @memberOf function
 */

var

/**
 * Negates a function that takes one/no argument.
 * @function module:function.negateF
 * @param fn {Function}
 * @returns {function(*=): boolean}
 */
negateF = exports.negateF = function negateF(fn) {
  return function (x) {
    return !fn(x);
  };
},


/**
 * Takes a function that takes two parameters and returns a negated version of given
 * function.
 * @function module:_negate.negateF2
 * @param fn {Function}
 * @returns {Function}
 */
negateF2 = exports.negateF2 = function negateF2(fn) {
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
 * Returns a negated version of given function.
 * Returned function is variadiac (takes one or more arguments).
 * @note function returned is uncurried.
 * @uncurried
 * @function module:function.negateFN
 * @param fn {Function}
 * @returns {Function}
 */
negateFN = exports.negateFN = function negateFN(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !(0, _function.apply)(fn, args);
  };
};