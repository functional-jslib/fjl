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
    global.negateP = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @memberOf functionOps
   */

  /**
   * Negates a predicate function.
   * @function module:functionOps.negateP
   * @param fn {Function}
   * @returns {Function} - Negated predicate
   */
  var negateP = exports.negateP = function negateP(fn) {
    return function (x, ind, xs) {
      return !fn(x, ind, xs);
    };
  };
});