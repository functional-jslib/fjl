define(['exports', '../functionOps/curry', '../uncurried/objectOps/instanceOf'], function (exports, _curry, _instanceOf) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.instanceOf = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   */

  const

  /**
   * Returns whether constructor has derived objectOps.
   * @instanceConstructor {Function|Class}
   * @instance {*}
   * @returns {Boolean}
   */
  instanceOf = exports.instanceOf = (0, _curry.curry)(_instanceOf.instanceOf);
});