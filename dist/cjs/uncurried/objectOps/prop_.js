"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @memberOf objectOps_
 */

/**
 * Returns property value if found; Else `undefined`.
 * @function module:objectOps_.prop
 * @param name {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
var prop = exports.prop = function prop(name, obj) {
  return obj[name];
};