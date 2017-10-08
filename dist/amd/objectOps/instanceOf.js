define(['exports', '../functionOps/curry', '../uncurried/objectOps/instanceOf_'], function (exports, _curry, _instanceOf_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.instanceOf = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   * @memberOf objectOps
   */

  const

  /**
   * `instanceof` in function form.
   * @function module:objectOps.instanceOf
   * @param instance {*}
   * @param Type {Function}
   * @returns {Boolean}
   */
  instanceOf = exports.instanceOf = (0, _curry.curry)(_instanceOf_.instanceOf);
});