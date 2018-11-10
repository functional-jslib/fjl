"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverse = exports.push = exports.join = exports.every = exports.some = exports.forEach = exports.reduceRight = exports.reduce = exports.filter = exports.map = exports.defineReverse = void 0;

var _utils = require("../utils");

/**
 * Created by elyde on 7/20/2017.
 * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
 * @module _jsPlatform_arrayOps
 * @private
 */
var
/**
 * Array.prototype.reverse generator (generates a function that calls the prototype version or a
 * shimmed version if it doesn't exist).
 * @returns {Function}
 */
defineReverse = function defineReverse() {
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
 * Maps a function to functor (list etc.).
 * @function module:_jsPlatform_array.map
 * @param fn {Function}
 * @param functor {Array|{map: {Function}}}
 * @returns {Array|{map: {Function}}}
 */
map = (0, _utils.fPureTakesOne)('map'),

/**
 * Filters a functor (list etc.) with passed in function.
 * @function module:_jsPlatform_array.filter
 * @param fn {Function}
 * @param functor {Array|{filter: {Function}}}
 * @returns {Array|{filter: {Function}}}
 */
filter = (0, _utils.fPureTakesOne)('filter'),

/**
 * Reduces a foldable (list etc.) with passed in function.
 * @function module:_jsPlatform_array.reduce
 * @param fn {Function}
 * @param functor {Array|{reduce: {Function}}}
 * @returns {Array|{reduce: {Function}}}
 */
reduce = (0, _utils.fPureTakes2)('reduce'),

/**
 * Reduces a foldable (list etc.) from the right with passed in function.
 * @function module:_jsPlatform_array.reduceRight
 * @param fn {Function}
 * @param functor {Array|{reduceRight: {Function}}}
 * @returns {Array|{reduceRight: {Function}}}
 */
reduceRight = (0, _utils.fPureTakes2)('reduceRight'),

/**
 * For each on functor (Array|Object|etc.).
 * @param fn {Function}
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type of object you pass in unless it doesn't have a `forEach` method.
 * @throws {Error} - When passed in functor doesn't have a `forEach` method.
 */
forEach = (0, _utils.fPureTakesOne)('forEach'),

/**
 * Returns `true` if `fn` (predicate) returns true for at least one item
 * in functor else returns `false`.
 * @param fn {Function} - Predicate.
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have a `some` method.
 */
some = (0, _utils.fPureTakesOne)('some'),

/**
 * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
 * @param fn {Function} - Predicate.
 * @param functor {Array|Object|*}
 * @return {*|Array|Object} - The type passed.
 * @throws {Error} - When passed in object doesn't have an `every` method.
 */
every = (0, _utils.fPureTakesOne)('every'),

/**
 * Array.prototype.join
 * @function module:listPrelude.join
 * @param separator {String|RegExp}
 * @param arr {Array}
 * @returns {String}
 */
join = (0, _utils.fPureTakesOne)('join'),

/**
 * Same as Array.prototype.push
 * @param item {*}
 * @param arr {Array}
 * @returns {Number}
 */
push = (0, _utils.fPureTakesOneOrMore)('push'),

/**
 * Reverses an list (shimmed if not exists).
 * @function module:listPrelude.reverse
 * @return {Array}
 */
reverse = defineReverse();

exports.reverse = reverse;
exports.push = push;
exports.join = join;
exports.every = every;
exports.some = some;
exports.forEach = forEach;
exports.reduceRight = reduceRight;
exports.reduce = reduce;
exports.filter = filter;
exports.map = map;
exports.defineReverse = defineReverse;