define(['exports', './is', '../function/curry'], function (exports, _is, _curry) {
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

  const lookup = exports.lookup = (0, _curry.curry)((key, obj) => (0, _is.isset)(obj) ? obj[key] : undefined);
});