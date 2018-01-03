'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;

var _utils = require('../_utils');

var

/**
 * Concats/appends all functors onto the end of first functor.
 * Note:  functors passed in after the first one must be of the same type.
 * @function module:_jsPlatform_list.concat
 * @param functor {Array|Object|*}
 * @param ...functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have an `every` method.
 */
concat = exports.concat = (0, _utils.fPureTakesOneOrMore)('concat'),


/**
 * Same as Array.prototype.slice
 * @function module:_jsPlatform_list.slice
 * @param separator {String|RegExp}
 * @param arr{Array}
 * @returns {Array}
 */
slice = exports.slice = (0, _utils.fPureTakes2)('slice'),


/**
 * `Array.prototype.includes` or shim.
 * @function module:_jsPlatform_list.includes
 * @param value {*}
 * @param xs {Array|String}
 * @returns {Boolean}
 */
includes = exports.includes = function () {
  return 'includes' in Array.prototype ? (0, _utils.fPureTakesOne)('includes') : function (value, xs) {
    return xs.indexOf(value) > -1;
  };
}(),


/**
 * Searches list/list-like for given element `x`.
 * @function module:_jsPlatform_list.indexOf
 * @param x {*} - Element to search for.
 * @param xs {Array|String|*} - list or list like to look in.
 * @returns {Number} - `-1` if element not found else index at which it is found.
 */
indexOf = exports.indexOf = (0, _utils.fPureTakesOne)('indexOf'),


/**
 * Last index of (`Array.prototype.lastIndexOf`).
 * @function module:_jsPlatform_list.lastIndexOf
 * @param x {*} - Element to search for.
 * @param xs {Array|String|*} - list or list like to look in.
 * @returns {Number} - `-1` if element not found else index at which it is found.
 */
lastIndexOf = exports.lastIndexOf = (0, _utils.fPureTakesOne)('lastIndexOf'); /**
                                                                               *  List operations that overlap (apart from globally overlapping props and functions like `length`)
                                                                               *      on both strings and arrays.
                                                                               */