define(['exports', '../functionOps/curry', '../uncurried/jsPlatform/list_'], function (exports, _curry, _list_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;
    /**
     * List operations that overlap (apart from globally overlapping props and functions like `length` and `toString`)
     * on both strings and arrays.
     * @module jsPlatform_list
     * @private
     */

    const concat = exports.concat = (0, _curry.curry)(_list_.concat),
          slice = exports.slice = (0, _curry.curry)(_list_.slice),
          includes = exports.includes = (0, _curry.curry)(_list_.includes),
          indexOf = exports.indexOf = (0, _curry.curry)(_list_.indexOf),
          lastIndexOf = exports.lastIndexOf = (0, _curry.curry)(_list_.lastIndexOf);
});