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
    global._id = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @memberOf _functionOps
   */

  /**
   * Returns passed in parameter.
   * @haskellType `id :: a -> a`
   * @function module:functionOps.id
   * @param x {*}
   * @returns {*}
   */
  var id = exports.id = function id(x) {
    return x;
  };
});