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
    global._prop = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * @memberOf _objectOps
   */

  /**
   * Returns property value if found; Else `undefined`.
   * @function module:_object._prop
   * @param name {String} - Key to search on `obj`
   * @param obj {Object} - Object to search `name` on.
   * @returns {*}
   */
  var _prop = exports._prop = function _prop(name, obj) {
    return obj[name];
  };
});