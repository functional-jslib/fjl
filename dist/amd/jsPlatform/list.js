define(['exports', '../uncurried/_functionOps/_curry', '../uncurried/_jsPlatform/_list'], function (exports, _curry, _list) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.lastIndexOf = exports.indexOf = exports.includes = exports.slice = exports.concat = undefined;
    /**
     * List operations that overlap (apart from globally overlapping props and functions like `length`)
     * on both strings and arrays.
     * @module jsPlatform_list
     * @private
     */

    const

    /**
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @function module:jsPlatform_array.concat
     * @param functor {Array|Object|*}
     * @param ...functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in object doesn't have an `every` method.
     */
    concat = exports.concat = (0, _curry.curry)(_list.concat),


    /**
     * Same as Array.prototype.slice
     * @function module:jsPlatform_array.slice
     * @param separator {String|RegExp}
     * @param arr{Array}
     * @returns {Array}
     */
    slice = exports.slice = (0, _curry.curry)(_list.slice),
          includes = exports.includes = (0, _curry.curry)(_list.includes),
          indexOf = exports.indexOf = (0, _curry.curry)(_list.indexOf),
          lastIndexOf = exports.lastIndexOf = (0, _curry.curry)(_list.lastIndexOf);
});