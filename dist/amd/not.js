define(['exports', './is', './typeOf'], function (exports, _is, _typeOf) {
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
    return !(0, _is.isEmpty)(value) && (0, _typeOf.typeOfIs)(value, type);
  }

  exports.default = {
    notEmptyAndOfType: notEmptyAndOfType
  };
});