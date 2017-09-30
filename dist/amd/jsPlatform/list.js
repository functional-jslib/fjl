define(['exports', '../functionOps/curry', '../uncurried/jsPlatform/listUncurried'], function (exports, _curry, _listUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;
  /**
   * List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
   * on both strings and arrays.
   * @module jsPlatform_list
   */

  const concat = exports.concat = _listUncurried.concat,


  /**
   * Calls `slice` method on passed in instance.
   * @function module:jsPlatform_list.slice
   * @param separator {String|RegExp}
   * @param list {Array|String|*}
   * @returns {Array|String|*}
   */
  slice = exports.slice = (0, _curry.curry)(_listUncurried.slice),
        includes = exports.includes = _listUncurried.includes,
        indexOf = exports.indexOf = _listUncurried.indexOf,
        lastIndexOf = exports.lastIndexOf = _listUncurried.lastIndexOf;
});