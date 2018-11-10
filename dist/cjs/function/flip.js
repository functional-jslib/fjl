"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip5 = exports.flip4 = exports.flip3 = exports.flip = exports.flipN = void 0;

var _array = require("../jsPlatform/array");

var _function = require("../jsPlatform/function");

var _curry = require("./curry");

var
/**
 * Returns a curried function requiring given functions arguments in reverse
 * (returned function expects 2 or more variables (curried at 2 or more args)).
 * @function module:function.flipN
 * @param fn {Function}
 * @returns {Function}
 * @curried
 */
flipN = function flipN(fn) {
  return (0, _curry.curry2)(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
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
flip = function flip(fn) {
  return (0, _curry.curry)(function (b, a) {
    return (0, _function.call)(fn, a, b);
  });
},

/**
 * Same as `flip` except returns a flipped function of arity 3.
 * @function module:function.flip3
 * @param fn {Function}
 * @returns {Function}
 */
flip3 = function flip3(fn) {
  return (0, _curry.curry)(function (c, b, a) {
    return (0, _function.call)(fn, a, b, c);
  });
},

/**
 * Same as `flip` except returns a flipped function of arity 4.
 * @function module:function.flip4
 * @param fn {Function}
 * @returns {Function}
 */
flip4 = function flip4(fn) {
  return (0, _curry.curry)(function (d, c, b, a) {
    return (0, _function.call)(fn, a, b, c, d);
  });
},

/**
 * Same as `flip` except returns a flipped function of arity 5.
 * @function module:function.flip5
 * @param fn {Function}
 * @returns {Function}
 */
flip5 = function flip5(fn) {
  return (0, _curry.curry)(function (e, d, c, b, a) {
    return (0, _function.call)(fn, a, b, c, d, e);
  });
};

exports.flip5 = flip5;
exports.flip4 = flip4;
exports.flip3 = flip3;
exports.flip = flip;
exports.flipN = flipN;