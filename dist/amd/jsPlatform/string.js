define(['exports', '../uncurried/_functionOps/curry_', '../uncurried/jsPlatform/string_'], function (exports, _curry_, _string_) {
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

  const split = exports.split = (0, _curry_.curry)(_string_.split);
});