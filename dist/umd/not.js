(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './is', './typeOf'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./is'), require('./typeOf'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.is, global.typeOf);
    global.not = mod.exports;
  }
})(this, function (exports, _is, _typeOf) {
  /**
   * Created by elyde on 12/18/2016.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.notEmptyAndOfType = notEmptyAndOfType;


  /**
   * Returns true if an element is not empty and is of type.
   * @function module:sjl.notEmptyAndOfType
   * @param value {*} - Value to check.
   * @param type {String|Function} - Type to check against (string name or actual constructor).
   * @returns {Boolean}
   */
  function notEmptyAndOfType(value, type) {
    return !(0, _is.isEmpty)(value) && (0, _typeOf.typeOfIs)(type, value);
  }

  exports.default = {
    notEmptyAndOfType: notEmptyAndOfType
  };
});