define(['exports', './is', './typeOf'], function (exports, _is, _typeOf) {
  /**
   * Created by elyde on 12/18/2016.
   */

  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.notOfTypeOrEmpty = notOfTypeOrEmpty;
  exports.notEmptyAndOfType = notEmptyAndOfType;


  /**
   * Retruns a boolean based on whether a key on an object has an empty value or is empty (not set, undefined, null)
   * @function module:sjl.notOfTypeOrEmpty
   * @param value {Object} - Object to search on.
   * @param type {String} - Optional. Type Name to check for match for;  E.g., 'Number', 'Array', 'HTMLMediaElement' etc..
   * @returns {Boolean}
   */
  function notOfTypeOrEmpty(value, type) {
    return (0, _is.isEmpty)(value) || !(0, _typeOf.typeOfIs)(value, type);
  }

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
    notOfTypeOrEmpty: notOfTypeOrEmpty,
    notEmptyAndOfType: notEmptyAndOfType
  };
});