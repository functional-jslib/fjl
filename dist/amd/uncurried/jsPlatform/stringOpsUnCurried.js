define(['exports', '../../utils/utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.split = undefined;


  /**
   * Functional version of `String.prototype.split`.
   * @functionOps module:stringOpsUnCurried.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  const split = exports.split = (0, _utils.fPureTakesOne)('split'); /**
                                                                     * Created by elydelacruz on 9/6/2017.
                                                                     */
});