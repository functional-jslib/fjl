'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compose = undefined;

var _listOps = require('../listOps/listOps');

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the functionOps on the left of itself.
 * @functionOps module:fjl.compose
 * @type {Function}
 * @param args {...Function}
 * @returns {Function}
 */
var compose = exports.compose = function compose() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function (arg0) {
    return (0, _listOps.foldr)(function (value, fn) {
      return fn(value);
    }, arg0, args);
  };
};