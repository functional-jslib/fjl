define(["exports", "../object/is"], function (_exports, _is) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.toFunction = void 0;

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

  _exports.toFunction = toFunction;
});