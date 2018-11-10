"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lookup = void 0;

var _is = require("./is");

var _curry = require("../function/curry");

/**
 * @memberOf object
 */

/**
 * Looks up property and returns it's value; Else `undefined`.
 * Method is null safe (will not throw on `null` or `undefined`).
 * @function module:object.lookup
 * @param key {String} - Key to search on `obj`
 * @param obj {Object} - Object to search `name` on.
 * @returns {*}
 */
var lookup = (0, _curry.curry)(function (key, obj) {
  return (0, _is.isset)(obj) ? obj[key] : undefined;
});
exports.lookup = lookup;