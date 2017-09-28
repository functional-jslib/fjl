'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip = exports.flipN = undefined;

var _listOps = require('../listOps/listOps');

var _curry = require('./curry');

var _apply = require('./apply');

var _call = require('./call');

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
  return (0, _curry.curry3)(function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _apply.apply)(fn, (0, _listOps.reverse)(args));
  });
},


/**
 * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
 * @function module:fnOperators.flip
 * @param fn {Function}
 * @returns {Function}
 */
flip = exports.flip = function flip(fn) {
  return (0, _curry.curry)(function (b, a) {
    return (0, _call.call)(fn, a, b);
  });
};