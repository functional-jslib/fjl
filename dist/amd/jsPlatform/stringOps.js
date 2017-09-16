define(['exports', '../functionOps/curry', '../uncurried/jsPlatform/stringOpsUnCurried'], function (exports, _curry, _stringOpsUnCurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.split = undefined;


  /**
   * Functional version of `String.prototype.split`.
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  /**
   * Created by elydelacruz on 9/6/2017.
   */

  const split = exports.split = (0, _curry.curry)(_stringOpsUnCurried.split);
});