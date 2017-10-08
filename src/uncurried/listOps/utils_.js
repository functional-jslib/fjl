/**
 * List operator utils module.
 * @module listOpsUtils_
 * @private
 */
import {apply}              from '../jsPlatform/function_';  // un-curried version
import {slice}              from '../jsPlatform/list_';      // un-curried version good for both strings and arrays
import {length}             from '../jsPlatform/object_';
import {alwaysFalse}        from '../../booleanOps';
import {map}                from './map_';

export * from './aggregation_';

export const

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @function module:listOpsUtils_.sliceFrom
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFrom = (startInd, arr) => slice(startInd, length(arr), arr),

    /**
     * Slices from index `0` to given index.
     * @function module:listOpsUtils_.sliceTo
     * @param toInd {Number}
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceTo = (toInd, xs) => slice(0, toInd, xs),

    /**
     * Slices a copy of list.
     * @function listOpsUtils_.sliceFrom
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    copy = xs => sliceFrom(0, xs),

    /**
     * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
     * @function module:listOpsUtils_.genericAscOrdering
     * @param a {*}
     * @param b {*}
     * @returns {number}
     */
    genericAscOrdering = (a, b) => {
        if (a > b) { return 1; }
        else if (a < b) { return -1; }
        return 0;
    },

    /**
     * Returns length of all passed lists in list.
     * @function module:listOpsUtils_.lengths
     * @param lists ...{Array|String|*}
     * @returns {Array|String|*}
     */
    lengths = (...lists) => length(lists) ? map(length, lists) : [],

    /**
     * @function module:listOpsUtils_.lengthsToSmallest
     * @param lists {...(Array|String|*)}
     * @returns {Array|String|*}
     */
    lengthsToSmallest = (...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = Math.min.apply(Math, listLengths);
        return map((list, ind) => listLengths[ind] > smallLen ?
            sliceTo(smallLen, list) : copy(list), lists);
    },

    reduceUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },

    reduceRightUntil = (pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) { return agg; }
        let ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) { break; }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    },

    reduce = (operation, agg, arr) =>
        reduceUntil(
            alwaysFalse,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr),                   // list

    reduceRight = (operation, agg, arr) =>
        reduceRightUntil(
            alwaysFalse,            // predicate
            operation,              // operation
            agg,                    // aggregator
            arr),                   // list

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listOpsUtils_lastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = x => { const len = length(x); return len ? len - 1 : 0; },

    /**
     * Finds index in string or list.
     * @function module:listOpsUtils_findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = (pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    },

    /**
     * Finds index in list from right to left.
     * @function module:listOpsUtils_findIndexWhereRight
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhereRight = (pred, arr) => {
        const limit = length(arr);
        let ind = limit,
            predicateFulfilled = false;
        for (; ind >= 0 && !predicateFulfilled; --ind) {
            predicateFulfilled = pred(arr[ind], ind, arr);
        }
        return ind;
    },

    /**
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = (pred, xs) => {
        const limit = length(xs);
        if (!limit) { return undefined; }
        let ind = 0,
            out = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) { out.push(ind); }
        }
        return out;
    },

    /**
     * @function module:listOpsUtils_find
     * @param pred {Function}
     * @param xs {Array|String|*} - list or list like.
     * @returns {*}
     */
    findWhere = (pred, xs) => {
        let ind = 0,
            limit = length(xs);
        if (!limit) { return; }
        for (; ind < limit; ind++) {
            let elm = xs[ind];
            if (pred(elm, ind, xs)) { return elm; }
        }
    },

    _swap = (list, ind1, ind2) => {
        const tmp = list[ind1];
        list[ind1] = list[ind2];
        list[ind2] = tmp;
        return list;
    },

    _permutationsAlgo = (listIn, remainderLen, listOut) => {
        if (remainderLen === 1) { return listIn; }

        for (let i = 0; i < remainderLen; i++) {
            const newLen = remainderLen - 1;

            _permutationsAlgo(listIn, newLen, listOut);

            // If remainderLen is odd, swap first and last element
            //  else, swap ith and last element
            _swap(listIn, (remainderLen % 2 === 1 ? 0 : i), listOut);
        }
        return listOut;
    }
;
