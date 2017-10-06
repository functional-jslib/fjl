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
    global.booleanOps = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Created by elyde on 7/15/2017.
   * @module booleanOps
   */

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
  },


  /**
   * Returns `true`.
   * @function module:booleanOps.alwaysTrue
   * @returns {Boolean}
   */
  alwaysTrue = exports.alwaysTrue = function alwaysTrue() {
    return true;
  },


  /**
   * Returns `false`.
   * @function module:booleanOps.alwaysFalse
   * @returns {Boolean}
   */
  alwaysFalse = exports.alwaysFalse = function alwaysFalse() {
    return false;
  };
});