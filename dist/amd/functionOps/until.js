define(['exports', '../uncurried/functionOps/curry_', '../uncurried/functionOps/until_'], function (exports, _curry_, _until_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.until = undefined;
  /**
   * @memberOf functionOps
   */
  const

  /**
   * Run `operation` `until` predicate returns `true`.
   * @function module:functionOps.until
   * @param predicate {Function} :: a -> Boolean
   * @param operation {Function} :: a -> a
   * @param typeInstance {*} :: * - A monoidal zero or some starting point.
   * @returns {*} - What ever type `typeInstance` is
   * @curried
   */
  until = exports.until = (0, _curry_.curry)(_until_.until);
});