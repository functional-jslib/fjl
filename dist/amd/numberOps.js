define(["exports"], function (exports) {
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
  const negate = exports.negate = x => Math.abs(x) * -1;
});