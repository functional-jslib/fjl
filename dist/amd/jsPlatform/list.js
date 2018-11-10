define(["exports", "../utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.lastIndexOf = _exports.indexOf = _exports.includes = _exports.slice = _exports.concat = void 0;

  /**
   *  List operations that overlap (apart from globally overlapping props and functions like `length`)
   *      on both strings and arrays.
   *      @memberOf list
   */
  var
  /**
   * Concats/appends all functors onto the end of first functor.
   * Note:  functors passed in after the first one must be of the same type.
   * @function module:list.concat
   * @param functor {Array|Object|*}
   * @param ...functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in object doesn't have an `every` method.
   */
  concat = (0, _utils.fPureTakesOneOrMore)('concat'),

  /**
   * Same as Array.prototype.slice
   * @function module:list.slice
   * @param separator {String|RegExp}
   * @param arr{Array}
   * @returns {Array}
   */
  slice = (0, _utils.fPureTakes2)('slice'),

  /**
   * `Array.prototype.includes` or shim.
   * @function module:list.includes
   * @param value {*}
   * @param xs {Array|String}
   * @returns {Boolean}
   */
  includes = function () {
    return 'includes' in Array.prototype ? (0, _utils.fPureTakesOne)('includes') : function (value, xs) {
      return xs.indexOf(value) > -1;
    };
  }(),

  /**
   * Searches list/list-like for given element `x`.
   * @function module:list.indexOf
   * @param x {*} - Element to search for.
   * @param xs {Array|String|*} - list or list like to look in.
   * @returns {Number} - `-1` if element not found else index at which it is found.
   */
  indexOf = (0, _utils.fPureTakesOne)('indexOf'),

  /**
   * Last index of (`Array.prototype.lastIndexOf`).
   * @function module:list.lastIndexOf
   * @param x {*} - Element to search for.
   * @param xs {Array|String|*} - list or list like to look in.
   * @returns {Number} - `-1` if element not found else index at which it is found.
   */
  lastIndexOf = (0, _utils.fPureTakesOne)('lastIndexOf');

  _exports.lastIndexOf = lastIndexOf;
  _exports.indexOf = indexOf;
  _exports.includes = includes;
  _exports.slice = slice;
  _exports.concat = concat;
});