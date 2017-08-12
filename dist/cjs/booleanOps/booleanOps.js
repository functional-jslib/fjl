'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.equal = exports.otherwise = exports.not = exports.or = exports.and = exports.isFalsy = exports.isTruthy = undefined;

var _is = require('./is');

Object.defineProperty(exports, 'isTruthy', {
  enumerable: true,
  get: function get() {
    return _is.isTruthy;
  }
});
Object.defineProperty(exports, 'isFalsy', {
  enumerable: true,
  get: function get() {
    return _is.isFalsy;
  }
});

var _curry = require('../functionOps/curry');

var

/**
 * Returns whether both values are truthy or not.
 * @function module:booleanOps.and
 * @param a {*}
 * @param b {*}
 * @returns {Boolean}
 */
and = exports.and = (0, _curry.curry2)(function (a, b) {
  return a && b;
}),


/**
 * Returns whether one of the two passed in values
 *  are truthy or not.
 * @function module:booleanOps.or
 * @param a {*}
 * @param b {*}
 * @returns {Boolean}
 */
or = exports.or = (0, _curry.curry2)(function (a, b) {
  return a || b;
}),


/**
 * Returns whether passed in value is truthy or not.
 * @function module:booleanOps.not
 * @param x {*}
 * @returns {Boolean}
 */
not = exports.not = function not(x) {
  return !x;
},


/**
 * Returns `true` - Makes code more readable in places.
 * @tentative
 * @function module:booleanOps.otherwise
 * @returns {Boolean} - Always true
 */
otherwise = exports.otherwise = function otherwise() {
  return true;
},


/**
 * Returns whether both values passed in are equal or not.
 * @function module:booleanOps.equal
 * @param a {*}
 * @param b {*}
 * @returns {Boolean}
 */
equal = exports.equal = (0, _curry.curry2)(function (a, b) {
  return a === b;
});