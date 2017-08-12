define(['exports', './curry'], function (exports, _curry) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.call = undefined;
  const

  /**
   * Functional `call` functionOps (takes no context).
   * @functionOps module:fnOperators.call
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  call = exports.call = (0, _curry.curry2)((fn, ...args) => fn.call(null, ...args)); /**
                                                                                      * Created by elydelacruz on 7/22/2017.
                                                                                      */
});