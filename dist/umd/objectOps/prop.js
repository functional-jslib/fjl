(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../uncurried/functionOps/curry_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../uncurried/functionOps/curry_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry_);
    global.prop = mod.exports;
  }
})(this, function (exports, _curry_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.prop = undefined;


  /**
   * Returns property value if found; Else `undefined`.
   * @function module:objectOps.prop
   * @param name {String} - Key to search on `obj`
   * @param obj {Object} - Object to search `name` on.
   * @returns {*}
   */
  var prop = exports.prop = (0, _curry_.curry)(function (name, obj) {
    return obj[name];
  }); /**
       * @memberOf objectOps
       */
});