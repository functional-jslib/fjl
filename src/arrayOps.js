/**
 * Array operators module.
 * @module arrayOperators
 * @type {{complement: Function, difference: Function, intersect: Function, union: Function, flatten: Function, flattenMulti: Function, filter: Function, map: Function, reduce: Function, reduceRight: Function, head: Function, tail: Function, init: Function, last: Function, reverse: Function}}
 */

'use strict';

import {curry2, curry3} from './curry';
import {apply} from './functionOps';
import {isString} from './is';
import negate from './negate';

/**
 * @returns {Function}
 */
function defineReverse () {
    return Array.prototype.reverse ? x => x.reverse() :
        x => x.reduceRight((agg, item) => {
            agg.push(item);
            return agg;
        }, []);
}

export const

    ASC = 1,

    DESC = -1,

    not = curry2((p, elm) => !p(elm)),

    /**
     * Functional version of `Array.prototype.join`.
     * @function module:arrayOperators.join
     * @param separator {String|RegExp}
     * @param arr {Array}
     * @returns {String}
     */
    join = curry2((separator, arr) => arr ? arr.join(separator) : ''),

    /**
     * Functional concat (requires 2 or more values to run).
     * @curried Sets minimum arity to 2
     * @param arr0 {Array}
     * @param ...arrays {Array}
     * @type {Function}
     */
    concat = curry2((arr0, ...arrays) => arr0.concat.apply(arr0, arrays)),

    onlyOneOrNegOne = x => x === 1 || x === -1 ? x : 1,

    getSortByOrder = curry2((multiplier, valueFn = v => v) => {
        const x = onlyOneOrNegOne(multiplier),
            ifGreaterThan = 1 * x,
            ifLessThan = -1 * x;
        return (...values) => values.sort((a1, b1) => {
            let a = valueFn(a1),
                b = valueFn(b1);
            if (a > b) {
                return ifGreaterThan;
            }
            else if (b > a) {
                return ifLessThan;
            }
            return 0;
        });
    }),

    sortDesc = getSortByOrder(DESC),

    sortAsc = getSortByOrder(ASC),

    sortDescByLength = getSortByOrder(DESC, x => x.length),

    /**
     * Returns head of array (first item of array).
     * @function module:arrayOperators.head
     * @param functor {Array}
     * @returns {*} - First item from array
     */
    head = functor => functor[0],

    /**
     * Returns tail part of array (everything after the first item as new array).
     * @function module:arrayOperators.tail
     * @param functor {Array}
     * @returns {Array}
     */
    tail = functor => functor.slice(1),

    /**
     * Returns everything except last item of array as new array.
     * @function module:arrayOperators.init
     * @param functor {Array}
     * @returns {Array}
     */
    init = functor => functor.slice(0, functor.length - 1),

    /**
     * Returns last item of array.
     * @function module:arrayOperators.last
     * @param functor {Array}
     * @returns {*}
     */
    last = functor => functor[functor.length - 1],

    take = curry2((limit, array) => array.slice(0, limit - 1)),

    drop = curry2((count, array) => array.slice(count, array.length - 1)),

    splitStrAt = curry2((ind, str) => [
        str.substring(0, ind),
        str.substring(ind, str.length)
    ]),

    splitArrayAt = curry2((ind, arr) => [
        arr.slice(0, ind),
        arr.slice(ind, arr.length)
    ]),

    splitAt = curry2((ind, x) => isString(x) ? splitStrAt(ind, x) : splitArrayAt(ind, x)),

    rangeOnIterable = curry2((predicate, arr) => {
        let ind = 0;
        while (predicate(arr[ind]) && ind < arr.length) ind += 1;
        return ind;
    }),

    takeWhile = curry2((predicate, arr) =>
        arr.slice(0, rangeOnIterable(predicate, arr))),

    dropWhile = curry2((predicate, arr) =>
        arr.slice(rangeOnIterable(predicate, arr), arr.length - 1)),

    span = curry2((predicate, arr) => [
        takeWhile(predicate, arr),
        dropWhile(predicate, arr)
    ]),

    breakOnList = curry2((predicate, arr) => [
        takeWhile(negate(predicate), arr),
        dropWhile(negate(predicate), arr)
    ]),

    /**
     * Returns the lengths of all the items in an array.
     * @param arrs {...Array}
     * @type {Function}
     */
    lengths = curry2(...arrs => arrs.length ? arrs.map(arr => arr.length) : []),

    /**
     * Returns an ordered array (ascending or descending) with the lengths of all items passed in.
     * @param orderDir {Number} - 1 or -1 for ascending or descending.
     * @param arrs {...Array}
     * @returns {Array} - Array of lengths;
     */
    orderedLengths = curry2((orderDir, ...arrs) => length(arrs) ? (orderDir ? sortAsc : sortDesc)(lengths(arrs)) : []),

    /**
     * Return a new set of arrays of the ones passed in sliced to the shortest ones length.
     * @param arrays {...Array}
     * @returns {Array<Array>}
     */
    trimLengths = (...arrays) => {
        const smallLen = orderedLengths(ASC, arrays)[0];
        return arrays.map(arr => arr.length > smallLen ? arr.slice(0, smallLen) : arr.slice(0));
    },

    /**
     * Reverses an array (shimmed if not exists).
     * @function module:arrayOperators.reverse
     * @return {Array}
     */
    reverse = defineReverse(),

    /**
     * Maps a function to functor (array etc.).
     * @function module:arrayOperators.map
     * @param fn {Function}
     * @param functor {Array|{map: {Function}}}
     * @returns {Array|{map: {Function}}}
     */
    map = curry2((fn, functor) => functor.map(fn)),

    /**
     * Filters a functor (array etc.) with passed in function.
     * @function module:arrayOperators.filter
     * @param fn {Function}
     * @param functor {Array|{filter: {Function}}}
     * @returns {Array|{filter: {Function}}}
     */
    filter = curry2((fn, arr) => arr.filter(fn)),

    /**
     * Reduces a foldable (array etc.) with passed in function.
     * @function module:arrayOperators.reduce
     * @param fn {Function}
     * @param functor {Array|{reduce: {Function}}}
     * @returns {Array|{reduce: {Function}}}
     */
    reduce = curry2((fn, agg, arr) => arr.reduce(fn, agg)),

    /**
     * Reduces a foldable (array etc.) from the right with passed in function.
     * @function module:arrayOperators.reduceRight
     * @param fn {Function}
     * @param functor {Array|{reduceRight: {Function}}}
     * @returns {Array|{reduceRight: {Function}}}
     */
    reduceRight = curry3((fn, agg, functor) => functor.reduceRight(fn, agg)),

    /**
     * Flattens an array.
     * @function module:arrayOperators.flatten
     * @param arr {Array}
     * @returns {Array}
     */
    flatten = arr => arr.reduce((agg, elm) => {
        if (Array.isArray(elm)) {
            return concat(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, []),

    /**
     * Flattens all arrays passed in into one array.
     * @function module:arrayOperators.flattenMulti
     * @param arr {Array}
     * @param [...arrays{Array}] - Other arrays to flatten into new array.
     * @returns {Array}
     */
    flattenMulti = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => concat(agg, flatten(arr)), flatten(arr0), arrays)),

    /**
     * @function module:arrayOperators.zip
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array<Array<*,*>>}
     */
    zip = curry2((arr1, arr2) => {
        const {0: a1, 1: a2} = trimLengths(arr1, arr2);
        return a1.reduce((agg, item, ind) => {
                agg.push([item, a2[ind]]);
            return agg;
        }, []);
    }),

    zipN = curry2((...arrs) => {
        const lists = apply(trimLengths, arrs);
        return lists.reduce((agg, arr, ind) => {
            if (!ind) {
                return zip (agg, arr);
            }
            return agg.map (arr2 => {
                arr.forEach (elm => {
                    arr2.push(elm);
                });
                return arr2;
            });
        }, lists.shift());
    }),

    unzip = arr =>
        reduce((agg, item) => {
            agg[0].push(item[0]);
            agg[1].push(item[1]);
            return agg;
        }, [[], []], arr),

    unzipN = (...arrs) =>
        reduce((agg, item) => {
            agg.push(unzip(item));
            return agg;
        }, [], arrs),

    /**
     * Creates a union on matching elements from array1.
     * @function module:arrayOperators.union
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    union = curry2((arr1, arr2) =>
        concat(arr1, filter(elm => arr1.indexOf(elm) === -1, arr2))),

    /**
     * Performs an intersection on array 1 with  elements from array 2.
     * @function module:arrayOperators.intersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    intersect = curry2((arr1, arr2) => arr2.length === 0 ? [] :
            filter(elm => arr2.indexOf(elm) > -1, arr1)),

    /**
     * Returns the difference of array 1 from array 2.
     * @function module:arrayOperators.difference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    difference = curry2((array1, array2) => { // augment this with max length and min length ordering on op
        let [arr1, arr2] = sortDescByLength(array1, array2);
        if (!arr2 || arr2.length === 0) {
            return arr1.slice();
        }
        return reduce((agg, elm) => {
            if (arr2.indexOf(elm) === -1) {
                agg.push(elm);
            }
            return agg;
        }, [], arr1);
    }),

    /**
     * Returns the complement of array 0 and the reset of the passed in arrays.
     * @function module:arrayOperators.complement
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    complement = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => concat(agg, difference(arr, arr0)), [], arrays));

export default {
    complement,
    difference,
    intersect,
    union,
    flatten,
    flattenMulti,
    filter,
    map,
    reduce,
    reduceRight,
    head,
    tail,
    init,
    last,
    zip,
    zipN,
    unzip,
    unzipN,
    reverse,
    lengths,
    orderedLengths,
    getSortByOrder,
    sortAsc,
    sortDesc,
    sortDescByLength,
    breakOnList,
    splitAt,
    concat,
    take,
    drop,
    join,
    ASC,
    DESC
};
