define(['exports', '../uncurried/_functionOps/_curry', '../uncurried/_jsPlatform/_string'], function (exports, _curry, _string) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.split = undefined;


  /**
   * Functional version of `String.prototype.split`.
   * @curried
   * @function module:jsPlatform_string.split
   * @param separator {String|RegExp}
   * @param str {String}
   * @returns {Array}
   */
  /**
   * Created by elydelacruz on 9/6/2017.
   * @module jsPlatform_string
   * @private
   */

  const split = exports.split = (0, _curry.curry)(_string.split);
});