/**
 * List operator utils module.
 * @module listUtils
 */
import {apply}          from '../jsPlatform/function';  // un-curried version
import {slice}          from '../jsPlatform/list';      // un-curried version good for both strings and arrays
import {length}         from '../jsPlatform/object';
import {alwaysFalse}    from '../boolean';
import map              from './map';
import {curry, curry2}  from '../function/curry';

export * from './aggregation';

export const

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @function module:listUtils.sliceFrom
     * @param startInd {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFrom = curry((startInd, xs) => slice(startInd, undefined, xs)),

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
     * @function listUtils.sliceCopy
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
    lengths = curry2((...lists) => map(length, lists)),

    /**
     * Returns a list of lists trimmed to the shortest length in given list of lists.   @background This method is used by the `zip*` functions to achieve their
     *  'slice to smallest' functionality.
     * @function module:listUtils.toShortest
     * @param lists {...(Array|String|*)}
     * @returns {Array|String|*}
     */
    toShortest = curry2((...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = Math.min.apply(Math, listLengths);
        return map((list, ind) => listLengths[ind] > smallLen ?
            sliceTo(smallLen, list) : sliceCopy(list), lists);
    }),

    /**
     * Reduces until predicate.
     * @function module:listUtils.reduceUntil
     * @param pred {Function} - `(item, index, list) => Boolean(...)`
     * @param op {Function} - Operation - `(agg, item, index, list) => agg`
     * @param agg {*} - Zero value.
     * @param xs {Array|String|*} - List.
     * @returns {*}
     */
    reduceUntil = curry((pred, op, agg, xs) => {
        const limit = length(xs);
        if (!limit) { return agg; }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { break; }
            result = op(result, xs[ind], ind, xs);
        }
        return result;
    }),

    /**
     * Reduces until predicate (from right to left).
     * @function module:listUtils.reduceUntilRight
     * @param pred {Function} - `(item, index, list) => Boolean(...)`
     * @param op {Function} - Operation - `(agg, item, index, list) => agg`
     * @param agg {*} - Zero value.
     * @param xs {Array|String|*} - List.
     * @returns {*}
     */
    reduceUntilRight = curry((pred, op, agg, arr) => {
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

    /**
     * Reduces a list with given operation (`op`) function.
     * @function module:listUtils.reduce
     * @param op {Function} - Operation - `(agg, item, index, list) => agg`
     * @param agg {*} - Zero value.
     * @param xs {Array|String|*} - List.
     * @returns {*}
     */
    reduce = reduceUntil(alwaysFalse),

    /**
     * Reduces a list with given operation (`op`) function (from right-to-left).
     * @function module:listUtils.reduceRight
     * @param op {Function} - Operation - `(agg, item, index, list) => agg`
     * @param agg {*} - Zero value.
     * @param xs {Array|String|*} - List.
     * @returns {*}
     */
    reduceRight = reduceUntilRight(alwaysFalse),

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listUtils.lastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = x => { const len = length(x); return len ? len - 1 : 0; },

    /**
     * Finds index in string or list.
     * @function module:listUtils.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = curry((pred, arr) => {
        let ind = 0;
        const limit = length(arr);
        for (; ind < limit; ind += 1) {
            const predicateFulfilled = !!pred(arr[ind], ind, arr);
            if (predicateFulfilled) {
                return ind;
            }
        }
        return -1;
    }),

    /**
     * Finds index in list from right to left.
     * @function module:listUtils.findIndexWhereRight
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhereRight = curry((pred, arr) => {
        let ind = length(arr) - 1;
        for (; ind >= 0; ind -= 1) {
            const predicateFulfilled = !!pred(arr[ind], ind, arr);
            if (predicateFulfilled) {
                return ind;
            }
        }
        return -1;
    }),

    /**
     * @function module:listUtils.findIndicesWhere
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = curry((pred, xs) => {
        const limit = length(xs);
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out.length ? out : undefined;
    }),

    /**
     * @function module:listUtils.findWhere
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
        return undefined;
    })

;
