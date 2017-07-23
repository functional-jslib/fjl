/**
 * Array operators module.
 * @module arrayOperators
 */

'use strict';

import {curry, curry2} from '../function/curry';
import {apply} from '../function/apply';
import {isString} from '../type-checking/is';
import {filter, reduce, concat} from './listPrelude';
import {negate as negateP} from '../function/functionPrelude';

export const

    ASC = 1,

    DESC = -1,

    onlyOneOrNegOne = x => x === 1 || x === -1 ? x : 1,

    getSortByOrder = curry((multiplier, valueFn) => {
        valueFn = valueFn || (v => v);
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
     * Returns head of list (first item of list).
     * @function module:arrayOperators.head
     * @param functor {Array}
     * @returns {*} - First item from list
     */
    head = functor => functor[0],

    /**
     * Returns tail part of list (everything after the first item as new list).
     * @function module:arrayOperators.tail
     * @param functor {Array}
     * @returns {Array}
     */
    tail = functor => functor.slice(1),

    /**
     * Returns everything except last item of list as new list.
     * @function module:arrayOperators.init
     * @param functor {Array}
     * @returns {Array}
     */
    init = functor => functor.slice(0, functor.length - 1),

    /**
     * Returns last item of list.
     * @function module:arrayOperators.last
     * @param functor {Array}
     * @returns {*}
     */
    last = functor => functor[functor.length - 1],

    take = curry((limit, array) => array.slice(0, limit - 1)),

    drop = curry((count, array) => array.slice(count, array.length - 1)),

    splitStrAt = curry((ind, str) => [
        str.substring(0, ind),
        str.substring(ind, str.length)
    ]),

    splitArrayAt = curry((ind, arr) => [
        arr.slice(0, ind),
        arr.slice(ind, arr.length)
    ]),

    splitAt = curry((ind, x) => (isString(x) ? splitStrAt : splitArrayAt)(ind, x)),

    rangeOnIterable = curry((predicate, arr) => {
        let ind = 0;
        while (predicate(arr[ind]) && ind < arr.length) ind += 1;
        return ind;
    }),

    takeWhile = curry((predicate, arr) =>
        arr.slice(0, rangeOnIterable(predicate, arr))),

    dropWhile = curry((predicate, arr) =>
        arr.slice(rangeOnIterable(predicate, arr), arr.length - 1)),

    span = curry((predicate, arr) => [
        takeWhile(predicate, arr),
        dropWhile(predicate, arr)
    ]),

    breakOnList = curry((predicate, arr) => [
        takeWhile(negateP(predicate), arr),
        dropWhile(negateP(predicate), arr)
    ]),

    /**
     * Returns the lengths of all the items in an list.
     * @param arrs {...Array}
     * @type {Function}
     */
    lengths = curry2(...arrs => arrs.length ? arrs.map(arr => arr.length) : []),

    /**
     * Returns an ordered list (ascending or descending) with the lengths of all items passed in.
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
     * Flattens an list.
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
     * Flattens all arrays passed in into one list.
     * @function module:arrayOperators.flattenMulti
     * @param arr {Array}
     * @param [...arrays{Array}] - Other arrays to flatten into new list.
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
    zip = curry((arr1, arr2) => {
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
    union = curry((arr1, arr2) =>
        concat(arr1, filter(elm => arr1.indexOf(elm) === -1, arr2))),

    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:arrayOperators.intersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    intersect = curry((arr1, arr2) => arr2.length === 0 ? [] :
            filter(elm => arr2.indexOf(elm) > -1, arr1)),

    /**
     * Returns the difference of list 1 from list 2.
     * @function module:arrayOperators.difference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    difference = curry((array1, array2) => { // augment this with max length and min length ordering on op
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
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:arrayOperators.complement
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    complement = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => concat(agg, difference(arr, arr0)), [], arrays));
