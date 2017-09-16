'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;

var _curry = require('../functionOps/curry');

var _listOpsUncurried = require('../uncurried/jsPlatform/listOpsUncurried');

/**
 *  List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
 *      on both strings and arrays.
 */

var concat = exports.concat = _listOpsUncurried.concat,


/**
 * Calls `slice` method on passed in instance.
 * @function module:jsPlatform.listOps
 * @param separator {String|RegExp}
 * @param list {Array|String|*}
 * @returns {Array|String|*}
 */
slice = exports.slice = (0, _curry.curry)(_listOpsUncurried.slice),
    includes = exports.includes = _listOpsUncurried.includes,
    indexOf = exports.indexOf = _listOpsUncurried.indexOf,
    lastIndexOf = exports.lastIndexOf = _listOpsUncurried.lastIndexOf;