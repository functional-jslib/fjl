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
    global.boolean = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @module boolean
   * @description Contains functional version of 'always-true', 'always-false', 'is-truthy', and 'is-falsy'.
   */

  var

  /**
   * Returns whether `value` is 'truthy' or not
   * @function module:boolean.isTruthy
   * @param value
   * @returns {Boolean}
   */
  isTruthy = exports.isTruthy = function isTruthy(value) {
    return !!value;
  },


  /**
   * Returns whether `value` is 'falsy' or not
   * @function module:boolean.isFalsy
   * @param value
   * @returns {Boolean}
   */
  isFalsy = exports.isFalsy = function isFalsy(value) {
    return !value;
  },


  /**
   * Returns `true`.
   * @function module:boolean.alwaysTrue
   * @returns {Boolean}
   */
  alwaysTrue = exports.alwaysTrue = function alwaysTrue() {
    return true;
  },


  /**
   * Returns `false`.
   * @function module:boolean.alwaysFalse
   * @returns {Boolean}
   */
  alwaysFalse = exports.alwaysFalse = function alwaysFalse() {
    return false;
  };
});