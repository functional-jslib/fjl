'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip = exports.flipN = undefined;

var _arrayOpsUncurried = require('../jsPlatform/arrayOpsUncurried');

var _apply = require('./apply');

var _call = require('./call');

var

/**
 * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
 * @functionOps module:functionOps.flipN
 * @param fn {Function}
 * @returns {Function}
 */
flipN = exports.flipN = function flipN(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _apply.apply)(fn, (0, _arrayOpsUncurried.reverse)(args));
  };
},


/**
 * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
 * @functionOps module:functionOps.flip
 * @param fn {Function}
 * @returns {Function}
 */
flip = exports.flip = function flip(fn) {
  return function (b, a) {
    return (0, _call.call)(fn, a, b);
  };
};