'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bEqual = exports.bOtherwise = exports.bNot = exports.bOr = exports.bAnd = exports.alwaysFalse = exports.alwaysTrue = exports.isFalsy = exports.isTruthy = undefined;

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
 * Returns `true`.
 * @function module:booleanOps.alwaysTrue
 * @returns {Boolean}
 */
alwaysTrue = exports.alwaysTrue = function alwaysTrue() {
  return true;
},


/**
 * Returns `false`.
 * @function module:booleanOps.alwaysFalse
 * @returns {Boolean}
 */
alwaysFalse = exports.alwaysFalse = function alwaysFalse() {
  return false;
},


/**
 * Returns whether both values are truthy or not.
 * @function module:booleanOps.bAnd
 * @param a {*}
 * @param b {*}
 * @returns {Boolean}
 */
bAnd = exports.bAnd = (0, _curry.curry2)(function (a, b) {
  return a && b;
}),


/**
 * Returns whether one of the two passed in values
 *  are truthy or not.
 * @function module:booleanOps.bOr
 * @param a {*}
 * @param b {*}
 * @returns {Boolean}
 */
bOr = exports.bOr = (0, _curry.curry2)(function (a, b) {
  return a || b;
}),


/**
 * Returns whether passed in value is truthy or not.
 * @function module:booleanOps.bNot
 * @param x {*}
 * @returns {Boolean}
 */
bNot = exports.bNot = function bNot(x) {
  return !x;
},


/**
 * Returns `true` - Makes code more readable in places.
 * @tentative
 * @function module:booleanOps.otherwise
 * @returns {Boolean} - Always true
 */
bOtherwise = exports.bOtherwise = alwaysTrue,


/**
 * Returns whether both values passed in are equal or not.
 * @function module:booleanOps.bEqual
 * @param a {*}
 * @param b {*}
 * @returns {Boolean}
 */
bEqual = exports.bEqual = (0, _curry.curry2)(function (a, b) {
  return a === b;
});