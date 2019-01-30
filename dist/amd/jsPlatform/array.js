define(["exports", "../utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.reverse = _exports.push = _exports.join = _exports.every = _exports.some = _exports.forEach = _exports.reduceRight = _exports.reduce = _exports.filter = _exports.map = void 0;

  /**
   * Created by elyde on 7/20/2017.
   * Functional versions of common array methods (`map`, `filter`, etc.) (un-curried);
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
  };

  var
  /**
   * Maps a function to functor (list etc.).
   * @function module:jsPlatform.map
   * @param fn {Function}
   * @param functor {Array|{map: {Function}}}
   * @returns {Array|{map: {Function}}}
   */
  map = (0, _utils.fPureTakesOne)('map'),

  /**
   * Filters a functor (list etc.) with passed in function.
   * @function module:jsPlatform.filter
   * @param fn {Function}
   * @param functor {Array|{filter: {Function}}}
   * @returns {Array|{filter: {Function}}}
   */
  filter = (0, _utils.fPureTakesOne)('filter'),

  /**
   * Reduces a foldable (list etc.) with passed in function.
   * @function module:jsPlatform.reduce
   * @param fn {Function}
   * @param functor {Array|{reduce: {Function}}}
   * @returns {Array|{reduce: {Function}}}
   */
  reduce = (0, _utils.fPureTakes2)('reduce'),

  /**
   * Reduces a foldable (list etc.) from the right with passed in function.
   * @function module:jsPlatform.reduceRight
   * @param fn {Function}
   * @param functor {Array|{reduceRight: {Function}}}
   * @returns {Array|{reduceRight: {Function}}}
   */
  reduceRight = (0, _utils.fPureTakes2)('reduceRight'),

  /**
   * For each on functor (Array|Object|etc.).
   * @function module:jsPlatform.forEach
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
   * @function module:jsPlatform.every
   * @param fn {Function} - Predicate.
   * @param functor {Array|Object|*}
   * @return {*|Array|Object} - The type passed.
   * @throws {Error} - When passed in object doesn't have an `every` method.
   */
  every = (0, _utils.fPureTakesOne)('every'),

  /**
   * Array.prototype.join
   * @function module:jsPlatform.join
   * @param separator {String|RegExp}
   * @param arr {Array}
   * @returns {String}
   */
  join = (0, _utils.fPureTakesOne)('join'),

  /**
   * Same as Array.prototype.push
   * @function module:jsPlatform.push
   * @param item {*}
   * @param arr {Array}
   * @returns {Number}
   */
  push = (0, _utils.fPureTakesOneOrMore)('push'),

  /**
   * Reverses an list (shimmed if not exists).
   * @function module:jsPlatform.reverse
   * @param x {Array<any>}
   * @return {Array}
   */
  reverse = defineReverse();
  _exports.reverse = reverse;
  _exports.push = push;
  _exports.join = join;
  _exports.every = every;
  _exports.some = some;
  _exports.forEach = forEach;
  _exports.reduceRight = reduceRight;
  _exports.reduce = reduce;
  _exports.filter = filter;
  _exports.map = map;
});