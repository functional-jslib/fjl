define(['exports', '../utils/utils', '../uncurried/jsPlatform/arrayOpsUncurried'], function (exports, _utils, _arrayOpsUncurried) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.reverse = exports.push = exports.slice = exports.join = exports.concat = exports.every = exports.some = exports.forEach = exports.reduceRight = exports.reduce = exports.filter = exports.map = undefined;
  /**
   * Created by elyde on 7/20/2017.
   * Curried functional versions of common array methods (`filter`, `map`, etc.).
   * @module jsPlatform_arrayOps
   */

  const

  /**
   * Maps a functionOps to functor (listOps etc.).
   * @function module:jsPlatform_arrayOps.map
   * @param fn {Function}
   * @param functor {Array|{map: {Function}}}
   * @returns {Array|{map: {Function}}}
   */
  map = exports.map = (0, _utils.fPureTakesOne_)('map'),


  /**
   * Filters a functor (listOps etc.) with passed in functionOps.
   * @function module:jsPlatform_arrayOps.filter
   * @param fn {Function}
   * @param functor {Array|{filter: {Function}}}
   * @returns {Array|{filter: {Function}}}
   */
  filter = exports.filter = (0, _utils.fPureTakesOne_)('filter'),


  /**
   * Reduces a foldable (listOps etc.) with passed in functionOps.
   * @function module:jsPlatform_arrayOps.reduce
   * @param fn {Function}
   * @param functor {Array|{reduce: {Function}}}
   * @returns {Array|{reduce: {Function}}}
   */
  reduce = exports.reduce = (0, _utils.fPureTakes2_)('reduce'),


  /**
   * Reduces a foldable (listOps etc.) from the right with passed in functionOps.
   * @function module:jsPlatform_arrayOps.reduceRight
   * @param fn {Function}
   * @param functor {Array|{reduceRight: {Function}}}
   * @returns {Array|{reduceRight: {Function}}}
   */
  reduceRight = exports.reduceRight = (0, _utils.fPureTakes2_)('reduceRight'),


  /**
   * For each on functor (Array|Object|etc.).
   * @function module:jsPlatform_arrayOps.forEach
   * @param fn {Function}
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type of objectOps you pass in unless it doesn't have a `forEach` method.
   * @throws {Error} - When passed in functor doesn't have a `forEach` method.
   */
  forEach = exports.forEach = (0, _utils.fPureTakesOne_)('forEach'),


  /**
   * Returns `true` if `fn` (predicate) returns true for at least one item
   * in functor else returns `false`.
   * @function module:jsPlatform_arrayOps.some
   * @param fn {Function} - Predicate.
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in objectOps doesn't have a `some` method.
   */
  some = exports.some = (0, _utils.fPureTakesOne_)('some'),


  /**
   * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
   * @function module:jsPlatform_arrayOps.every
   * @param fn {Function} - Predicate.
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in objectOps doesn't have an `every` method.
   */
  every = exports.every = (0, _utils.fPureTakesOne_)('every'),


  /**
   * Concats/appends all functors onto the end of first functor.
   * Note:  functors passed in after the first one must be of the same type.
   * @function module:jsPlatform_arrayOps.concat
   * @param functor {Array|Object|*}
   * @param ...functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in objectOps doesn't have an `every` method.
   */
  concat = exports.concat = (0, _utils.fPureTakesOneOrMore_)('concat'),


  /**
   * Array.prototype.join
   * @function module:jsPlatform_arrayOps.join
   * @param separator {String|RegExp}
   * @param arr {Array}
   * @returns {String}
   */
  join = exports.join = (0, _utils.fPureTakesOne_)('join'),


  /**
   * Same as Array.prototype.slice
   * @function module:jsPlatform_arrayOps.slice
   * @param separator {String|RegExp}
   * @param arr{Array}
   * @returns {Array}
   */
  slice = exports.slice = (0, _utils.fPureTakes2_)('slice'),


  /**
   * Same as Array.prototype.push
   * @function module:jsPlatform_arrayOps.push
   * @param item {*}
   * @param arr {Array}
   * @returns {Number}
   */
  push = exports.push = (0, _utils.fPureTakesOneOrMore_)('push'),


  /**
   * Reverses an listOps (shimmed if not exists).
   * @function module:jsPlatform_arrayOps.reverse
   * @return {Array}
   */
  reverse = exports.reverse = (0, _arrayOpsUncurried.defineReverse)();
});