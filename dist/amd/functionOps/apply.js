define(['exports', './curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.apply = undefined;
  const

  /**
   * Functional `apply` functionOps (takes no context).
   * @functionOps module:fnOperators.apply
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  apply = exports.apply = (0, _curry.curry)((fn, args) => fn.apply(null, args)); /**
                                                                                  * Created by elydelacruz on 7/22/2017.
                                                                                  */
});