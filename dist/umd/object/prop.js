(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './is', '../function/curry'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./is'), require('../function/curry'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.is, global.curry);
    global.prop = mod.exports;
  }
})(this, function (exports, _is, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.prop = undefined;


  /**
   * Returns property value if found; Else `undefined`.
   * @note This method is null/undefined safe (will not throw on `null` or `undefined`).
   * @function module:object.prop
   * @param name {String} - Key to search on `obj`
   * @param obj {Object} - Object to search `name` on.
   * @returns {*}
   */
  /**
   * @memberOf object
   */

  var prop = exports.prop = (0, _curry.curry)(function (name, obj) {
    return (0, _is.isset)(obj) ? obj[name] : undefined;
  });
});