'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;

var _utils = require('../../utils/utils');

// export {length, toString} from './objectOpsUnCurried';

var

/**
 * @function module:jsPlatform.listOpsUncurried.concat
 */
concat = exports.concat = (0, _utils.fPureTakesOneOrMore)('concat'),


/**
 * @function module:jsPlatform.listOpsUncurried.slice
 */
slice = exports.slice = (0, _utils.fPureTakes2)('slice'),


/**
 * `Array.prototype.includes` or shim.
 * @function module:jsPlatform.listOpsUncurried.includes
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