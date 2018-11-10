"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = void 0;

var _array = require("../jsPlatform/array");

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the function on the left of itself.
 * @function module:function.compose
 * @type {Function}
 * @param args {...{Function}}
 * @returns {Function}
 */
var compose = function compose() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (arg0) {
    return (0, _array.reduceRight)(function (value, fn) {
      return fn(value);
    }, arg0, args);
  };
};

exports.compose = compose;