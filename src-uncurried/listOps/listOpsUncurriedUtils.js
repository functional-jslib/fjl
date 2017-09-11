/**
 * Array operators module.
 * @module listOpsUtils
 */
import {apply}              from '../jsPlatform/functionOpsUncurried';  // un-curried version
import {slice}              from '../jsPlatform/listOpsUncurried';      // un-curried version good for both strings and arrays
import {length}             from '../jsPlatform/objectOpsUncurried';
import {alwaysFalse}        from '../../src/booleanOps/booleanOps';
import {map}                from './map';
import {minimum}            from "./minimum";

export * from './listOpsUncurriedAggregation';

export const

    /**
     * Ascension multiplier.
     * @type {number}
     */
    ASC = 1,

    /**
     * Returns a slice of the given list from `startInd` to the end of the list.
     * @param startInd {Number}
     * @param arr {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceToEndFrom = (startInd, arr) => slice(startInd, length(arr), arr),

    /**
     * Slices list from zero to `x` value.
     * @param x {Array|String|*}
     * @returns {Array|String|*}
     */
    sliceFromZero = x => sliceToEndFrom(0, x),

    copy = sliceFromZero,

    /**
     * Always `1` or `-1`.
     * @param x {Number}
     * @returns {Number} - Always `1` or `-1`.
     */
    onlyOneOrNegOne = x => x === 1 || x === -1 ? x : 1,

    /**
     * @param multiplier
     * @param valueFn
     * @returns {function(*): (Array<*>|*)}
     */
    getSortByOrder = (multiplier, valueFn = (v => v)) => {
        const x = onlyOneOrNegOne(multiplier),
            ifGreaterThan = x,
            ifLessThan = -1 * x;
        return list => list.sort((a1, b1) => {
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
    },

    /**
     * Returns a function with a predefined ordering for sorting 'on' some specific criteria
     * Returned function returns a copy of passed in list sorted on value returned by `valueFn` passed
     *  to (returned) function.
     * @note Pattern used here is known as 'decorate-sort-un-decorate' or the "Schwartzian transform"
     *  it compares on returned by `valueFn` passed to returned function.
     *  This pattern calls the value extractor function only once per element whereas
     *  the default sort function calls it per comparison function call.
     * @param multiplier {Number} - `1` or `-1`.
     * @returns {Function} - Sorting 'on' function with it's ordering already defined ('descending' or 'ascending');
     */
    sortOnByDirection = multiplier => {
        const x = onlyOneOrNegOne(multiplier),
            ifGreaterThan = x,
            ifLessThan = -1 * x;

        // Un-decorate
        return (valueFn = (v => v), xs) =>
            map(decorated => decorated[1],
                // Decorate
                map(item => [valueFn(item), item], xs)
                    // Sort
                    .sort((a1, b1) => {
                        let a = a1[0],
                            b = b1[0];
                        if (a > b) { return ifGreaterThan; }
                        else if (b > a) { return ifLessThan; }
                        return 0;
                    }));
    },

    sortOnAsc = sortOnByDirection(ASC),

    sortAscByLength = getSortByOrder(ASC, length),

    sortAsc = getSortByOrder(ASC),

    /**
     * Returns length of all passed lists in list.
     * @param lists ...{Array|String|*}
     * @returns {Array|String|*}
     */
    lengths = (...lists) => length(lists) ? map(length, lists) : [],

    lengthsToSmallest = (...lists) => {
        const listLengths = apply(lengths, lists),
            smallLen = minimum(listLengths);
        return map((list, ind) => listLengths[ind] > smallLen ?
            slice(0, smallLen, list) : sliceFromZero(list), lists);
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
     * @function module:listOps.lastIndex
     * @param x {Array|String|*} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = x => { const len = length(x); return len ? len - 1 : 0; },

    /**
     * Finds index in string or list.
     * @function module:listOps.findIndexWhere
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
     * @function module:listOps.findIndexWhereRight
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
     * @function module:listOps.find
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
    }
;
