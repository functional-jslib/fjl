"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsonClone = void 0;

var
/**
 * Clones and object or array using `JSON.parse(JSON.stringify(...))` pattern.
 * @function module:object.jsonClone
 * @param x {*}
 * @returns {*}
 */
jsonClone = function jsonClone(x) {
  return JSON.parse(JSON.stringify(x));
};

exports.jsonClone = jsonClone;