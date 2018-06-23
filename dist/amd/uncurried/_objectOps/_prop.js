define(["exports"], function (exports) {
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
  const _prop = exports._prop = (name, obj) => obj[name];
});