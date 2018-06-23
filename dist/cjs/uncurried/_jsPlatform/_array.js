'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverse = exports.push = exports.join = exports.every = exports.some = exports.forEach = exports.reduceRight = exports.reduce = exports.filter = exports.map = exports.defineReverse = undefined;

var _utils = require('../_object/_utils');

var

/**
 * Array.prototype.reverse generator (generates a _functionOps that calls the prototype version or a
 * shimmed version if it doesn't exist).
 * @returns {Function}
 */
defineReverse = exports.defineReverse = function defineReverse() {
  return Array.prototype.reverse ? function (x) {
    return x.reverse();
  } : function (x) {
    return x.reduceRight(function (agg, item) {
      agg.push(item);
      return agg;
    }, []);
  };
},


/**
 * Maps a _functionOps to functor (_listOps etc.).
 * @function module:_jsPlatform_array.map
 * @param fn {Function}
 * @param functor {Array|{map: {Function}}}
 * @returns {Array|{map: {Function}}}
 */
map = exports.map = (0, _utils.fPureTakesOne)('map'),


/**
 * Filters a functor (_listOps etc.) with passed in _functionOps.
 * @function module:_jsPlatform_array.filter
 * @param fn {Function}
 * @param functor {Array|{filter: {Function}}}
 * @returns {Array|{filter: {Function}}}
 */
filter = exports.filter = (0, _utils.fPureTakesOne)('filter'),


/**
 * Reduces a foldable (_listOps etc.) with passed in _functionOps.
 * @function module:_jsPlatform_array.reduce
 * @param fn {Function}
 * @param functor {Array|{reduce: {Function}}}
 * @returns {Array|{reduce: {Function}}}
 */
reduce = exports.reduce = (0, _utils.fPureTakes2)('reduce'),


/**
 * Reduces a foldable (_listOps etc.) from the right with passed in _functionOps.
 * @function module:_jsPlatform_array.reduceRight
 * @param fn {Function}
 * @param functor {Array|{reduceRight: {Function}}}
 * @returns {Array|{reduceRight: {Function}}}
 */
reduceRight = exports.reduceRight = (0, _utils.fPureTakes2)('reduceRight'),


/**
 * For each on functor (Array|Object|etc.).
 * @param fn {Function}
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type of object you pass in unless it doesn't have a `forEach` method.
 * @throws {Error} - When passed in functor doesn't have a `forEach` method.
 */
forEach = exports.forEach = (0, _utils.fPureTakesOne)('forEach'),


/**
 * Returns `true` if `fn` (predicate) returns true for at least one item
 * in functor else returns `false`.
 * @param fn {Function} - Predicate.
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have a `some` method.
 */
some = exports.some = (0, _utils.fPureTakesOne)('some'),


/**
 * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
 * @param fn {Function} - Predicate.
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have an `every` method.
 */
every = exports.every = (0, _utils.fPureTakesOne)('every'),


/**
 * Array.prototype.join
 * @function module:listPrelude.join
 * @param separator {String|RegExp}
 * @param arr {Array}
 * @returns {String}
 */
join = exports.join = (0, _utils.fPureTakesOne)('join'),


/**
 * Same as Array.prototype.push
 * @param item {*}
 * @param arr {Array}
 * @returns {Number}
 */
push = exports.push = (0, _utils.fPureTakesOneOrMore)('push'),


/**
 * Reverses an _listOps (shimmed if not exists).
 * @function module:listPrelude.reverse
 * @return {Array}
 */
reverse = exports.reverse = defineReverse(); /**
                                              * Created by elyde on 7/20/2017.
                                              * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
                                              * @module _jsPlatform_arrayOps
                                              * @private
                                              * @todo updated doc blocks to list correct/updated module name.
                                              */