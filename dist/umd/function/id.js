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
    global.id = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.id = void 0;

  /**
   * @memberOf function
   */

  /**
   * Returns passed in parameter.
   * @haskellType `id :: a -> a`
   * @function module:function.id
   * @param x {*}
   * @returns {*}
   */
  var id = function id(x) {
    return x;
  };

  _exports.id = id;
});