'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equalAll = exports.equal = exports.alwaysFalse = exports.alwaysTrue = exports.isFalsy = exports.isTruthy = undefined;

var _curry = require('./function/curry');

var

/**
 * Returns whether `value` is 'truthy' or not
 * @function module:boolean.isTruthy
 * @param value
 * @returns {Boolean}
 */
isTruthy = exports.isTruthy = function isTruthy(value) {
  return !!value;
},


/**
 * Returns whether `value` is 'falsy' or not
 * @function module:boolean.isFalsy
 * @param value
 * @returns {Boolean}
 */
isFalsy = exports.isFalsy = function isFalsy(value) {
  return !value;
},


/**
 * Returns `true`.
 * @function module:boolean.alwaysTrue
 * @returns {Boolean}
 */
alwaysTrue = exports.alwaysTrue = function alwaysTrue() {
  return true;
},


/**
 * Returns `false`.
 * @function module:boolean.alwaysFalse
 * @returns {Boolean}
 */
alwaysFalse = exports.alwaysFalse = function alwaysFalse() {
  return false;
},


/**
 * Equality operator.
 * @function module:boolean.equal
 * @param a {*}
 * @param b {*}
 * @returns {boolean}
 */
equal = exports.equal = (0, _curry.curry)(function (a, b) {
  return a === b;
}),


/**
 * Equality operator for all.
 * @function module:boolean.equalAll
 * @param a {*} - Item `0`.
 * @param args {...*} - Others
 * @returns {boolean}
 */
equalAll = exports.equalAll = (0, _curry.curry2)(function (a) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.every(function (b) {
    return equal(a, b);
  });
}); /**
     * @module boolean
     * @description Contains functional version of 'always-true', 'always-false', 'is-truthy', and 'is-falsy'.
     */