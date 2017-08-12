define(['exports', '../functionOps/curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.instanceOf = undefined;
  const

  /**
   * Returns whether constructor has derived objectOps.
   * @instanceConstructor {Function|Class}
   * @instance {*}
   * @returns {Boolean}
   */
  instanceOf = exports.instanceOf = (0, _curry.curry)((instanceConstructor, instance) => instance instanceof instanceConstructor); /**
                                                                                                                                    * Created by elydelacruz on 7/22/2017.
                                                                                                                                    */
});