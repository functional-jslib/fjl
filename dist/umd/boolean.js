(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./function/curry"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./function/curry"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry);
    global["boolean"] = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _curry) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.equalAll = _exports.equal = _exports.alwaysFalse = _exports.alwaysTrue = _exports.isFalsy = _exports.isTruthy = void 0;

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
  isTruthy = function isTruthy(value) {
    return !!value;
  },

  /**
   * Returns whether `value` is 'falsy' or not
   * @function module:boolean.isFalsy
   * @param value
   * @returns {Boolean}
   */
  isFalsy = function isFalsy(value) {
    return !value;
  },

  /**
   * Returns `true`.
   * @function module:boolean.alwaysTrue
   * @returns {Boolean}
   */
  alwaysTrue = function alwaysTrue() {
    return true;
  },

  /**
   * Returns `false`.
   * @function module:boolean.alwaysFalse
   * @returns {Boolean}
   */
  alwaysFalse = function alwaysFalse() {
    return false;
  },

  /**
   * Equality operator.
   * @function module:boolean.equal
   * @param a {*}
   * @param b {*}
   * @returns {boolean}
   */
  equal = (0, _curry.curry)(function (a, b) {
    return a === b;
  }),

  /**
   * Equality operator for all.
   * @function module:boolean.equalAll
   * @param a {*} - Item `0`.
   * @param args {...*} - Others
   * @returns {boolean}
   */
  equalAll = (0, _curry.curry2)(function (a) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return args.every(function (b) {
      return equal(a, b);
    });
  });

  _exports.equalAll = equalAll;
  _exports.equal = equal;
  _exports.alwaysFalse = alwaysFalse;
  _exports.alwaysTrue = alwaysTrue;
  _exports.isFalsy = isFalsy;
  _exports.isTruthy = isTruthy;
});