'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip = exports.flipN = undefined;

var _array = require('../jsPlatform/array');

var _function = require('../jsPlatform/function');

var _curry = require('./curry');

var

/**
 * Returns a curried function requiring given functions arguments in reverse
 * (returned function expects 2 or more variables (curried at 2 or more args)).
 * @function module:function.flipN
 * @param fn {Function}
 * @returns {Function}
 * @curried
 */
flipN = exports.flipN = function flipN(fn) {
  return (0, _curry.curry2)(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _function.apply)(fn, (0, _array.reverse)(args));
  });
},


/**
 * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
 * @function module:function.flip
 * @param fn {Function}
 * @returns {Function}
 */
flip = exports.flip = function flip(fn) {
  return (0, _curry.curry)(function (b, a) {
    return (0, _function.call)(fn, a, b);
  });
};