(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.is = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var

  /**
   * Returns whether `value` is 'truthy' or not
   * @function module:booleanOps.isTruthy
   * @param value
   * @returns {Boolean}
   */
  isTruthy = exports.isTruthy = function isTruthy(value) {
    return !!value;
  },


  /**
   * Returns whether `value` is 'falsy' or not
   * @function module:booleanOps.isFalsy
   * @param value
   * @returns {Boolean}
   */
  isFalsy = exports.isFalsy = function isFalsy(value) {
    return !value;
  };
});