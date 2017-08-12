"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @module negate
 */

/**
 * Negates a predicate function.
 * @function module:functionOps.negateP
 * @param fn {Function}
 * @returns {Function} - Negated predicate
 */
var negateP = exports.negateP = function negateP(fn) {
  return function (x, ind, xs) {
    return !fn(x, ind, xs);
  };
};