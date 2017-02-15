"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;
/**
 * Created by elyde on 12/6/2016.
 */

/**
 * Compose combinator;  Allows to combine many functions into one;  Functions list gets reduced from right to left
 * and each function on receives the return value of the function that comes after it.
 * @param args {...Function}
 * @returns {function(*=): *}
 */
function compose() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (arg0) {
    return args.reduceRight(function (value, fn) {
      return fn(value);
    }, arg0);
  };
}
module.exports = exports["default"];