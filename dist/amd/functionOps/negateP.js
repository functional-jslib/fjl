define(["exports"], function (exports) {
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
  const negateP = exports.negateP = fn => (x, ind, xs) => !fn(x, ind, xs);
});