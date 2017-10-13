define(['exports', '../uncurried/functionOps/curry_', '../uncurried/jsPlatform/function_'], function (exports, _curry_, _function_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.call = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   * @memberOf functionOps
   */
  const

  /**
   * Functional `call` function (takes no context).
   * @function module:functionOps.call
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  call = exports.call = (0, _curry_.curry2)(_function_.call);
});