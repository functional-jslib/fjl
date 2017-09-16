define(['exports', './curry', '../uncurried/jsPlatform/functionOpsUncurried'], function (exports, _curry, _functionOpsUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.call = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   */
  const

  /**
   * Functional `call` functionOps (takes no context).
   * @functionOps module:fnOperators.call
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  call = exports.call = (0, _curry.curry2)(_functionOpsUncurried.call);
});