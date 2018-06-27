'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = exports.apply = undefined;

var _curry = require('../function/curry');

/**
 * Created by elydelacruz on 9/7/2017.
 * @module _jsPlatform_function
 * @private
 */
var

/**
 * Functional `apply` function (takes no context).
 * @function module:_jsPlatform_function.apply
 * @param fn {Function}
 * @param args {Array|*}
 * @returns {*}
 */
apply = exports.apply = (0, _curry.curry)(function (fn, args) {
  return fn.apply(null, args);
}),


/**
 * Functional `call` function (takes no context).
 * @function module:_jsPlatform_function.call
 * @param fn {Function}
 * @param args {...*}
 * @returns {*}
 */
call = exports.call = function call(fn) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return apply(fn, args);
};