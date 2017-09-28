define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const

  /**
   * Returns whether `value` is 'truthy' or not
   * @function module:booleanOps.isTruthy
   * @param value
   * @returns {Boolean}
   */
  isTruthy = exports.isTruthy = value => !!value,


  /**
   * Returns whether `value` is 'falsy' or not
   * @function module:booleanOps.isFalsy
   * @param value
   * @returns {Boolean}
   */
  isFalsy = exports.isFalsy = value => !value;
});