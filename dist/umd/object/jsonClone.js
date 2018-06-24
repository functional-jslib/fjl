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
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var

  /**
   * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
   * @function module:object.jsonClone
   * @param x {*}
   * @returns {*}
   */
  jsonClone = exports.jsonClone = function jsonClone(x) {
    return JSON.parse(JSON.stringify(x));
  };
});