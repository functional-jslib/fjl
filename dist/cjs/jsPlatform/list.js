'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;

var _curry_ = require('../uncurried/functionOps/curry_');

var _list_ = require('../uncurried/jsPlatform/list_');

/**
 * List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
 * on both strings and arrays.
 * @module jsPlatform_list
 * @private
 */

var concat = exports.concat = (0, _curry_.curry)(_list_.concat),
    slice = exports.slice = (0, _curry_.curry)(_list_.slice),
    includes = exports.includes = (0, _curry_.curry)(_list_.includes),
    indexOf = exports.indexOf = (0, _curry_.curry)(_list_.indexOf),
    lastIndexOf = exports.lastIndexOf = (0, _curry_.curry)(_list_.lastIndexOf);