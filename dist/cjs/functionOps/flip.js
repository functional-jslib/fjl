'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip = exports.flipN = undefined;

var _array = require('../jsPlatform/array');

var _functionOps_ = require('../uncurried/functionOps_');

/**
 * @memberOf functionOps
 */
var

/**
 * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
 * @function module:fnOperators.flipN
 * @param fn {Function}
 * @returns {Function}
 */
flipN = exports.flipN = function flipN(fn) {
  return (0, _functionOps_.curry3)(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _functionOps_.apply)(fn, (0, _array.reverse)(args));
  });
},


/**
 * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
 * @function module:fnOperators.flip
 * @param fn {Function}
 * @returns {Function}
 */
flip = exports.flip = function flip(fn) {
  return (0, _functionOps_.curry)(function (b, a) {
    return (0, _functionOps_.call)(fn, a, b);
  });
};