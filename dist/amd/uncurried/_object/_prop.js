define(['exports', './_is'], function (exports, _is) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports._prop = undefined;


  /**
   * Returns property value if found; Else `undefined`.
   * @note This method is null/undefined safe (will not throw on `null` or `undefined`).
   * @function module:object._prop
   * @param name {String} - Key to search on `obj`
   * @param obj {Object} - Object to search `name` on.
   * @returns {*}
   */
  const _prop = exports._prop = (name, obj) => (0, _is.isset)(obj) ? obj[name] : undefined; /**
                                                                                             * @memberOf _object
                                                                                             */
});