define(['exports', './is', '../function/curry'], function (exports, _is, _curry) {
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

  const prop = exports.prop = (0, _curry.curry)((name, obj) => (0, _is.isset)(obj) ? obj[name] : undefined);
});