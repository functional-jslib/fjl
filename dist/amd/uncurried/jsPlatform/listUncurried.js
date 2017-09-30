define(['exports', '../../utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;


  // export {length, toString} from './objectOpsUnCurried';

  const

  /**
   * Concats/appends all functors onto the end of first functor.
   * Note:  functors passed in after the first one must be of the same type.
   * @function module:jsPlatform.listOpsUncurried.concat
   * @param functor {Array|Object|*}
   * @param ...functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in objectOps doesn't have an `every` method.
   */
  concat = exports.concat = (0, _utils.fPureTakesOneOrMore)('concat'),


  /**
   * Same as Array.prototype.slice
   * @function module:jsPlatform.listOpsUncurried.slice
   * @param separator {String|RegExp}
   * @param arr{Array}
   * @returns {Array}
   */
  slice = exports.slice = (0, _utils.fPureTakes2)('slice'),


  /**
   * `Array.prototype.includes` or shim.
   * @function module:jsPlatform.listOpsUncurried.includes
   * @param value {*}
   * @param xs {Array|String}
   * @returns {Boolean}
   */
  includes = exports.includes = (() => 'includes' in Array.prototype ? (0, _utils.fPureTakesOne)('includes') : (value, xs) => xs.indexOf(value) > -1)(),


  /**
   * Searches list/list-like for given element `x`.
   * @function module:jsPlatform.listOpsUncurried.indexOf
   * @param x {*} - Element to search for.
   * @param xs {Array|String|*} - list or list like to look in.
   * @returns {Number} - `-1` if element not found else index at which it is found.
   */
  indexOf = exports.indexOf = (0, _utils.fPureTakesOne)('indexOf'),


  /**
   * Last index of (`Array.prototype.lastIndexOf`).
   * @function module:jsPlatform.listOpsUncurried.lastIndexOf
   * @param x {*} - Element to search for.
   * @param xs {Array|String|*} - list or list like to look in.
   * @returns {Number} - `-1` if element not found else index at which it is found.
   */
  lastIndexOf = exports.lastIndexOf = (0, _utils.fPureTakesOne)('lastIndexOf'); /**
                                                                                 *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
                                                                                 *      on both strings and arrays.
                                                                                 */
});