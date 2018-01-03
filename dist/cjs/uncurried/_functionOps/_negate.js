'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.negateFMany = exports.negateP = exports.negateF5 = exports.negateF4 = exports.negateF3 = exports.negateF = undefined;

var _function_ = require('../_jsPlatform/function_');

var _array_ = require('../_jsPlatform/array_');

/**
 * @memberOf _functionOps
 */

var negateF = exports.negateF = function negateF(fn) {
  return function (a, b) {
    return !fn(a, b);
  };
},
    negateF3 = exports.negateF3 = function negateF3(fn) {
  return function (a, b, c) {
    return !fn(a, b, c);
  };
},
    negateF4 = exports.negateF4 = function negateF4(fn) {
  return function (a, b, c, d) {
    return !fn(a, b, c, d);
  };
},
    negateF5 = exports.negateF5 = function negateF5(fn) {
  return function (a, b, c, d, e) {
    return !fn(a, b, c, d, e);
  };
},


/**
 * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
 * @function module:_functionOps.negateP
 * @param fn {Function}
 * @returns {Function}
 */
negateP = exports.negateP = negateF3,


/**
 * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
 * @function module:_functionOps.negateFMany
 * @param fn {Function}
 * @returns {Function}
 */
negateFMany = exports.negateFMany = function negateFMany(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return !(0, _function_.apply)(fn, (0, _array_.reverse)(args));
  };
};