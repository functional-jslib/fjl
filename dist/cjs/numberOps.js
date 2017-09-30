"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @module numberOps
 */

/**
 * Negates a number.
 * @function module:numberOps.negate
 * @param x {Number}
 * @returns {Number}
 */
var negate = exports.negate = function negate(x) {
  return Math.abs(x) * -1;
};