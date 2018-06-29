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
    global.lookup = mod.exports;
  }
})(this, function (exports, _is, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.lookup = undefined;


  /**
   * Looks up property and returns it's value; Else `undefined`.
   * Method is null safe (will not throw on `null` or `undefined`).
   * @function module:object.lookup
   * @param key {String} - Key to search on `obj`
   * @param obj {Object} - Object to search `name` on.
   * @returns {*}
   */
  /**
   * @memberOf object
   */

  var lookup = exports.lookup = (0, _curry.curry)(function (key, obj) {
    return (0, _is.isset)(obj) ? obj[key] : undefined;
  });
});