"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.call = exports.apply = void 0;

var _curry = require("../function/curry");

/**
 * Created by elydelacruz on 9/7/2017.
 * @memberOf function
 */
var
/**
 * Functional `apply` function (takes no context).
 * @function module:function.apply
 * @param fn {Function}
 * @param args {Array|*}
 * @returns {*}
 */
apply = (0, _curry.curry)(function (fn, args) {
  return fn.apply(null, args);
}),

/**
 * Functional `call` function (takes no context).
 * @function module:function.call
 * @param fn {Function}
 * @param args {...*}
 * @returns {*}
 */
call = (0, _curry.curry2)(function (fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return fn.call.apply(fn, [null].concat(args));
});
exports.call = call;
exports.apply = apply;