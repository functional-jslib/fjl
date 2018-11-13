"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toFunction = void 0;

var _is = require("../object/is");

var
/**
 * If given value is not a function, wraps it an 'identity' function (function that returns given value untouched) else returns given value. (useful in
 * functional composition).
 * @function module:function.toFunction
 * @param x {Function|any}
 * @returns {function(): any}
 */
toFunction = function toFunction(x) {
  return (0, _is.isFunction)(x) ? x : function () {
    return x;
  };
};

exports.toFunction = toFunction;