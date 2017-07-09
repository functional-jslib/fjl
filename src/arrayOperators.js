/**
 * Created by elyde on 12/29/2016.
 */
/**
 * Created by elyde on 12/10/2016.
 * Set functions for arrects.
 */

'use strict';

import {curry2, curry3} from './curry';

/**
 * @returns {Function}
 */
function defineReverse () {
    return Array.prototype.reverse ? x => x.reverse() :
        functor => functor.reduceRight((agg, item) => {
            agg.push(item);
            return agg;
        }, []);
}

let concat = curry2((arr0, ...arrays) => arr0.concat.apply(arr0, arrays)),

    sortAscByLength = (arr1, arr2) => [arr1, arr2].sort((a, b) => {
        let aLen = a.length,
            bLen = b.length;
        if (aLen > bLen) {
            return -1;
        }
        else if (bLen > aLen) {
            return 1;
        }
        return 0;
    });

export const

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
        let [arr1, arr2] = sortAscByLength(array1, array2);
        if (arr2.length === 0) {
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
        reduce((agg, arr) => concat(agg, difference(arr, arr0)), [], arrays)),

    /**
     * Array operators module (all functions here exported to top level `fjl` module).
     * @module arrayOperators
     * @type {{complement: Function, difference: Function, intersect: Function, union: Function, flatten: Function, flattenMulti: Function, filter: Function, map: Function, reduce: Function, reduceRight: Function, head: Function, tail: Function, init: Function, last: Function, reverse: Function}}
     */
    arrayOperators = {
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
        reverse
    };

export default arrayOperators;
