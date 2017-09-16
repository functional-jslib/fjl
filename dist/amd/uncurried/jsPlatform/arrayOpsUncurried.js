define(['exports', '../../utils/utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.reverse = exports.push = exports.slice = exports.join = exports.concat = exports.every = exports.some = exports.forEach = exports.reduceRight = exports.reduce = exports.filter = exports.map = exports.defineReverse = undefined;
  const

  /**
   * Array.prototype.reverse generator (generates a functionOps that calls the prototype version or a
   * shimmed version if it doesn't exist).
   * @returns {Function}
   */
  defineReverse = exports.defineReverse = () => Array.prototype.reverse ? x => x.reverse() : x => x.reduceRight((agg, item) => {
    agg.push(item);
    return agg;
  }, []),


  /**
   * Maps a functionOps to functor (listOps etc.).
   * @functionOps module:arrayOperators.map
   * @param fn {Function}
   * @param functor {Array|{map: {Function}}}
   * @returns {Array|{map: {Function}}}
   */
  map = exports.map = (0, _utils.fPureTakesOne)('map'),


  /**
   * Filters a functor (listOps etc.) with passed in functionOps.
   * @functionOps module:arrayOperators.filter
   * @param fn {Function}
   * @param functor {Array|{filter: {Function}}}
   * @returns {Array|{filter: {Function}}}
   */
  filter = exports.filter = (0, _utils.fPureTakesOne)('filter'),


  /**
   * Reduces a foldable (listOps etc.) with passed in functionOps.
   * @functionOps module:arrayOperators.reduce
   * @param fn {Function}
   * @param functor {Array|{reduce: {Function}}}
   * @returns {Array|{reduce: {Function}}}
   */
  reduce = exports.reduce = (0, _utils.fPureTakes2)('reduce'),


  /**
   * Reduces a foldable (listOps etc.) from the right with passed in functionOps.
   * @functionOps module:arrayOperators.reduceRight
   * @param fn {Function}
   * @param functor {Array|{reduceRight: {Function}}}
   * @returns {Array|{reduceRight: {Function}}}
   */
  reduceRight = exports.reduceRight = (0, _utils.fPureTakes2)('reduceRight'),


  /**
   * For each on functor (Array|Object|etc.).
   * @param fn {Function}
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type of objectOps you pass in unless it doesn't have a `forEach` method.
   * @throws {Error} - When passed in functor doesn't have a `forEach` method.
   */
  forEach = exports.forEach = (0, _utils.fPureTakesOne)('forEach'),


  /**
   * Returns `true` if `fn` (predicate) returns true for at least one item
   * in functor else returns `false`.
   * @param fn {Function} - Predicate.
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in objectOps doesn't have a `some` method.
   */
  some = exports.some = (0, _utils.fPureTakesOne)('some'),


  /**
   * Returns `true` if `fn` (predicate) returns true for all items in functor else returns `false`.
   * @param fn {Function} - Predicate.
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in objectOps doesn't have an `every` method.
   */
  every = exports.every = (0, _utils.fPureTakesOne)('every'),


  /**
   * Concats/appends all functors onto the end of first functor.
   * Note:  functors passed in after the first one must be of the same type.
   * @param functor {Array|Object|*}
   * @param ...functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in objectOps doesn't have an `every` method.
   */
  concat = exports.concat = (0, _utils.fPureTakesOneOrMore)('concat'),


  /**
   * Array.prototype.join
   * @functionOps module:listPrelude.join
   * @param separator {String|RegExp}
   * @param arr {Array}
   * @returns {String}
   */
  join = exports.join = (0, _utils.fPureTakesOne)('join'),


  /**
   * Same as Array.prototype.slice
   * @param separator {String|RegExp}
   * @param arr{Array}
   * @returns {Array}
   */
  slice = exports.slice = (0, _utils.fPureTakes2)('slice'),


  /**
   * Same as Array.prototype.push
   * @param item {*}
   * @param arr {Array}
   * @returns {Number}
   */
  push = exports.push = (0, _utils.fPureTakesOneOrMore)('push'),


  /**
   * Reverses an listOps (shimmed if not exists).
   * @functionOps module:listPrelude.reverse
   * @return {Array}
   */
  reverse = exports.reverse = defineReverse(); /**
                                                * Created by elyde on 7/20/2017.
                                                * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
                                                * @todo updated doc blocks to list correct/updated module name.
                                                */
});