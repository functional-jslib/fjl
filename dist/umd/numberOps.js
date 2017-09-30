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
    global.numberOps = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @module numberOps
   */

  /**
   * Negates a number.
   * @function module:numberOps.negate
   * @param x {Number}
   * @returns {Number}
   */
  var negate = exports.negate = function negate(x) {
    return Math.abs(x) * -1;
  };
});