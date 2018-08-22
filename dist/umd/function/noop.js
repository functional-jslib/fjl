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
    global.noop = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * No-op ('op' as in 'operation') - Performs no operation 'always' (good for places where
   * a value should always be a function etc.).
   * @function module:function.noop
   * @returns {undefined}
   */
  var noop = exports.noop = function noop() {
    return undefined;
  };
});