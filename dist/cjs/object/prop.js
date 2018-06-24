'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prop = undefined;

var _is = require('./is');

var _curry = require('../function/curry');

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

var prop = exports.prop = (0, _curry.curry)(function (name, obj) {
  return (0, _is.isset)(obj) ? obj[name] : undefined;
});