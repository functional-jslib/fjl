(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../utils_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../utils_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.utils_);
    global.list_ = mod.exports;
  }
})(this, function (exports, _utils_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;


  // export {length, toString} from './objectOps_';

  var

  /**
   * Concats/appends all functors onto the end of first functor.
   * Note:  functors passed in after the first one must be of the same type.
   * @function module:jsPlatform_list_.concat
   * @param functor {Array|Object|*}
   * @param ...functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in object doesn't have an `every` method.
   */
  concat = exports.concat = (0, _utils_.fPureTakesOneOrMore)('concat'),


  /**
   * Same as Array.prototype.slice
   * @function module:jsPlatform_list_.slice
   * @param separator {String|RegExp}
   * @param arr{Array}
   * @returns {Array}
   */
  slice = exports.slice = (0, _utils_.fPureTakes2)('slice'),


  /**
   * `Array.prototype.includes` or shim.
   * @function module:jsPlatform_list_.includes
   * @param value {*}
   * @param xs {Array|String}
   * @returns {Boolean}
   */
  includes = exports.includes = function () {
    return 'includes' in Array.prototype ? (0, _utils_.fPureTakesOne)('includes') : function (value, xs) {
      return xs.indexOf(value) > -1;
    };
  }(),


  /**
   * Searches list/list-like for given element `x`.
   * @function module:jsPlatform_list_.indexOf
   * @param x {*} - Element to search for.
   * @param xs {Array|String|*} - list or list like to look in.
   * @returns {Number} - `-1` if element not found else index at which it is found.
   */
  indexOf = exports.indexOf = (0, _utils_.fPureTakesOne)('indexOf'),


  /**
   * Last index of (`Array.prototype.lastIndexOf`).
   * @function module:jsPlatform_list_.lastIndexOf
   * @param x {*} - Element to search for.
   * @param xs {Array|String|*} - list or list like to look in.
   * @returns {Number} - `-1` if element not found else index at which it is found.
   */
  lastIndexOf = exports.lastIndexOf = (0, _utils_.fPureTakesOne)('lastIndexOf'); /**
                                                                                  *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
                                                                                  *      on both strings and arrays.
                                                                                  */
});