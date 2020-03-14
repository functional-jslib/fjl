(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "../jsPlatform/array"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("../jsPlatform/array"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.array);
    global.compose = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _array) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.compose = void 0;

  /**
   * Composes all functions passed in from right to left passing each functions return value to
   * the function on the left of itself.
   * @function module:function.compose
   * @type {Function}
   * @param args {...{Function}}
   * @returns {Function}
   */
  var compose = function compose() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return function (arg0) {
      return (0, _array.reduceRight)(function (value, fn) {
        return fn(value);
      }, arg0, args);
    };
  };

  _exports.compose = compose;
});