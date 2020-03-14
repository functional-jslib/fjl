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
    global.jsonClone = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.jsonClone = void 0;

  var
  /**
   * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
   * @function module:object.jsonClone
   * @param x {*}
   * @returns {*}
   */
  jsonClone = function jsonClone(x) {
    return JSON.parse(JSON.stringify(x));
  };

  _exports.jsonClone = jsonClone;
});