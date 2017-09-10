/**
 * Array operators module.
 * @module arrayOps
 * @todo decide whether to throw errors where functions cannot function without a specific type or to return undefined (and also determine which cases are ok for just returning undefined).
 * @todo code unperformant shorthand in `listOps`
 * @todo rename monoid functions to normal functions since we are not really defining methods for monoids here.
 */
import {curry}              from '../functionOps/curry';
import {apply}              from '../jsPlatform/functionOpsUnCurried';  // un-curried version
import {slice}              from '../jsPlatform/arrayOpsUnCurried';     // un-curried version good for both

import {alwaysFalse}        from '../booleanOps/booleanOps';
import {typeOf}             from '../objectOps/typeOf';
import {length}             from '../objectOps/objectPrelude';
import {fPureTakesOne_, fPureTakesOneOrMore_} from '../utils/utils';

const

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
     * Returns a copy of passed in list sorted on some property which
     * is decided by the `valueFn` function.
     * @note Pattern is known as 'decorate-sort-un-decorate' or the "Schwartzian transform"
     *  and used when the value-to-compare extracting function (`valueFn` here) is an expensive.
     *  This pattern calls the value extractor function only once per element whereas
     *  the default sort function calls it per comparison function call.
     * @param multiplier {Number} - `1` or `-1`.
     * @param valueFn {Function} - Returns some comparable value from item passed in.
     * @param xs {Array|String|*} - List to sort.
     * @returns {Array|String|*} - Whatever type of received list is.
     */
    sortOnByDirection = curry((multiplier, valueFn, xs) => {
        valueFn = valueFn || (v => v);
        const x = onlyOneOrNegOne(multiplier),
            ifGreaterThan = x,
            ifLessThan = -1 * x;

        // Un-decorate
        return map(decorated => decorated[1],
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
    }),

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

    aggregateStr = (agg, item) => agg + item,

    aggregateArr = (agg, item) => {
        agg.push(item);
        return agg;
    },

    aggregateObj = (agg, item, ind) => {
        agg[ind] = item;
        return agg;
    },

    aggregatorByType = x => {
        switch (typeOf(x)) {
            case 'String': return aggregateStr;
            case 'Array': return aggregateArr;
            case 'Object':
            default: return aggregateObj;
        }
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
     * Concats/appends all functors onto the end of first functor.
     * Note:  functors passed in after the first one must be of the same type.
     * @param functor {Array|Object|*}
     * @param ...functor {Array|Object|*}
     * @return {*|Array|Object} - The type passed.
     * @throws {Error} - When passed in objectOps doesn't have an `every` method.
     */
    arrayAppend = fPureTakesOneOrMore_('concat'),

    /**
     * Appends any subsequent lists (strings) onto the first one (string).
     * @note Same as a Monoidal `mappend`;  In this case for strings.
     * @param arg0 {String}
     * @param args {...String}
     * @returns {String}
     */
    strAppend = (arg0, ...args) => reduce(aggregateStr, arg0, args),

    /**
     * Searches list/list-like for given element `x`.
     * @param x {*} - Element to search for.
     * @param xs {Array|String|*} - list or list like to look in.
     * @returns {Number} - `-1` if element not found else index at which it is found.
     */
    indexOf = fPureTakesOne_('indexOf'),

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
