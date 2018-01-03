define(['exports', '../uncurried/_jsPlatform/array_', '../utils'], function (exports, _array_, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.push = exports.join = exports.every = exports.some = exports.forEach = exports.reduceRight = exports.reduce = exports.filter = exports.map = exports.reverse = undefined;
  Object.defineProperty(exports, 'reverse', {
    enumerable: true,
    get: function () {
      return _array_.reverse;
    }
  });
  const

  /**
   * Maps a _functionOps to functor (_listOps etc.).
   * @function module:jsPlatform_array.map
   * @param fn {Function}
   * @param functor {Array|{map: {Function}}}
   * @returns {Array|{map: {Function}}}
   */
  map = exports.map = (0, _utils.fPureTakesOne_)('map'),


  /**
   * Filters a functor (_listOps etc.) with passed in _functionOps.
   * @function module:jsPlatform_array.filter
   * @param fn {Function}
   * @param functor {Array|{filter: {Function}}}
   * @returns {Array|{filter: {Function}}}
   */
  filter = exports.filter = (0, _utils.fPureTakesOne_)('filter'),


  /**
   * Reduces a foldable (_listOps etc.) with passed in _functionOps.
   * @function module:jsPlatform_array.reduce
   * @param fn {Function}
   * @param functor {Array|{reduce: {Function}}}
   * @returns {Array|{reduce: {Function}}}
   */
  reduce = exports.reduce = (0, _utils.fPureTakes2_)('reduce'),


  /**
   * Reduces a foldable (_listOps etc.) from the right with passed in _functionOps.
   * @function module:jsPlatform_array.reduceRight
   * @param fn {Function}
   * @param functor {Array|{reduceRight: {Function}}}
   * @returns {Array|{reduceRight: {Function}}}
   */
  reduceRight = exports.reduceRight = (0, _utils.fPureTakes2_)('reduceRight'),


  /**
   * For each on functor (Array|Object|etc.).
   * @function module:jsPlatform_array.forEach
   * @param fn {Function}
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type of object you pass in unless it doesn't have a `forEach` method.
   * @throws {Error} - When passed in functor doesn't have a `forEach` method.
   */
  forEach = exports.forEach = (0, _utils.fPureTakesOne_)('forEach'),


  /**
   * Returns `true` if `fn` (predicate) returns true for at least one item
   * in functor else returns `false`.
   * @function module:jsPlatform_array.some
   * @param fn {Function} - Predicate.
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in object doesn't have a `some` method.
   */
  some = exports.some = (0, _utils.fPureTakesOne_)('some'),


  /**
   * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
   * @function module:jsPlatform_array.every
   * @param fn {Function} - Predicate.
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in object doesn't have an `every` method.
   */
  every = exports.every = (0, _utils.fPureTakesOne_)('every'),


  /**
   * Array.prototype.join
   * @function module:jsPlatform_array.join
   * @param separator {String|RegExp}
   * @param arr {Array}
   * @returns {String}
   */
  join = exports.join = (0, _utils.fPureTakesOne_)('join'),


  /**
   * Same as Array.prototype.push
   * @function module:jsPlatform_array.push
   * @param item {*}
   * @param arr {Array}
   * @returns {Number}
   */
  push = exports.push = (0, _utils.fPureTakesOneOrMore_)('push');
});