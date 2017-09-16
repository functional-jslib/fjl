define(['exports', './curry', '../uncurried/jsPlatform/functionOpsUncurried'], function (exports, _curry, _functionOpsUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.apply = undefined;
  /**
   * Created by elydelacruz on 7/22/2017.
   */
  const

  /**
   * Functional `apply` functionOps (takes no context).
   * @functionOps module:fnOperators.apply
   * @param fn {Function}
   * @param args {*}
   * @returns {*}
   */
  apply = exports.apply = (0, _curry.curry)(_functionOpsUncurried.apply);
});