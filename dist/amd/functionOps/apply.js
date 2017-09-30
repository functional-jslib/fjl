define(['exports', './curry', '../uncurried/jsPlatform/function_'], function (exports, _curry, _function_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.apply = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   * @memberOf functionOps
   */
  const

  /**
   * Functional `apply` functionOps (takes no context).
   * @function module:functionOps.apply
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  apply = exports.apply = (0, _curry.curry)(_function_.apply);
});