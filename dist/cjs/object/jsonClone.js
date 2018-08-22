"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var

/**
 * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
 * @function module:object.jsonClone
 * @param x {*}
 * @returns {*}
 */
jsonClone = exports.jsonClone = function jsonClone(x) {
  return JSON.parse(JSON.stringify(x));
};