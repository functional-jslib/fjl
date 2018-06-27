/**
 * List operator utils module.
 * @module _listOpUtils
 * @private
 */
import {apply}          from '../jsPlatform/function';  // un-curried version
import {slice}          from '../jsPlatform/list';      // un-curried version good for both strings and arrays
import {length}         from '../jsPlatform/object';
import {alwaysFalse}    from '../boolean';
import map              from './map';
import {curry}          from '../function/curry';

export * from './aggregation';

export const

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @function module:listUtils.sliceFrom
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFrom = curry((startInd, arr) => slice(startInd, undefined, arr)),

    /**
     * Slices from index `0` to given index.
     * @function module:listUtils.sliceTo
     * @param toInd {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceTo = curry((toInd, xs) => slice(0, toInd, xs)),

    /**
     * Slices a copy of list.
     * @function _listOpUtils.sliceCopy
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceCopy = sliceFrom(0),

    /**
     * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
     * @function module:listUtils.genericAscOrdering
     * @param a {*}
     * @param b {*}
     * @returns {number}
     */
    genericAscOrdering = curry((a, b) => {
        if (a > b) { return 1; }
        else if (a < b) { return -1; }
        return 0;
    }),

    /**
     * Returns length of all passed lists in list.
     * @function module:listUtils.lengths
     * @param lists ...{Array|String|*}
     * @returns {Array|String|*}
     */
    lengths = (...lists) => length(lists) ? map(length, lists) : [],

    /**
     * @function module:listUtils.lengthsToSmallest
     * @param lists {...(Array|String|*)}
     * @returns {Array|String|*}
     */
    lengthsToSmallest = (...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = Math.min.apply(Math, listLengths);
        return map((list, ind) => listLengths[ind] > smallLen ?
            sliceTo(smallLen, list) : sliceCopy(list), lists);
    },

    /**
     * Reduces until predicate.
     * @param pred
     * @param op
     * @param agg
     * @param arr
     * @returns {*}
     */
    reduceUntil = curry((pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    }),

    /**
     * Reduces until predicate (from the right).
     * @param pred
     * @param op
     * @param agg
     * @param arr
     * @returns {*}
     */
    reduceRightUntil = curry((pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    }),

    reduce = reduceUntil(alwaysFalse),

    reduceRight = reduceRightUntil(alwaysFalse),

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listOpUtilslastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = x => { const len = length(x); return len ? len - 1 : 0; },

    /**
     * Finds index in string or list.
     * @function module:listOpUtilsfindIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = curry((pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    }),

    /**
     * Finds index in list from right to left.
     * @function module:listOpUtilsfindIndexWhereRight
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhereRight = curry((pred, arr) => {
        const limit = length(arr);
        let ind = limit,
            predicateFulfilled = false;
        for (; ind >= 0 && !predicateFulfilled; --ind) {
            predicateFulfilled = pred(arr[ind], ind, arr);
        }
        return ind;
    }),

    /**
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = curry((pred, xs) => {
        if (!xs || !xs.length) { return undefined; }
        const limit = length(xs);
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out.length ? out : undefined;
    }),

    /**
     * @function module:listOpUtilsfind
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    findWhere = curry((pred, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return; }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) { return elm; }
        }
    })

;
