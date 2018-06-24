define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * Created by elyde on 7/15/2017.
   * @module boolean
   */

  const

  /**
   * Returns whether `value` is 'truthy' or not
   * @function module:boolean.isTruthy
   * @param value
   * @returns {Boolean}
   */
  isTruthy = exports.isTruthy = value => !!value,


  /**
   * Returns whether `value` is 'falsy' or not
   * @function module:boolean.isFalsy
   * @param value
   * @returns {Boolean}
   */
  isFalsy = exports.isFalsy = value => !value,


  /**
   * Returns `true`.
   * @function module:boolean.alwaysTrue
   * @returns {Boolean}
   */
  alwaysTrue = exports.alwaysTrue = () => true,


  /**
   * Returns `false`.
   * @function module:boolean.alwaysFalse
   * @returns {Boolean}
   */
  alwaysFalse = exports.alwaysFalse = () => false;
});