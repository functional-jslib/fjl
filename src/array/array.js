/**
 * Array operators module.
 * @module arrayOperators
 */

'use strict';

import {curry, curry2} from '../function/curry';
import {apply} from '../function/apply';
import {isArray} from '../object/is';
import {length} from '../object/objectPrelude';
import {filter, reduce, every, concat as arrayConcat, slice} from './arrayPrelude';
import {negate as negateP} from '../function/function';
import {isTruthy, isFalsy} from '../boolean/is';

const

    ASC = 1,

    DESC = -1,

    aggregateStr = (agg, item) => {
        agg += item; return agg;
    },

    aggregateArr = (agg, item, ind) => {
        agg[ind] = item; return agg;
    },

    strConcat = curry((x, ...args) => reduce(aggregateStr, x, args));

/*
function permutationSwap (arr, ind1, ind2) {
    const element = arr[ind1];
    arr[ind1] = arr[ind2];
    arr[ind2] = element;
}
*/

export const

    concat = curry2((x, ...args) => (isArray(x) ? arrayConcat : strConcat)(x, ...args)),

    any = curry((p, xs) => {
        const limit = length(xs);
        let ind = -1;
        while (++ind < limit) {
            if (p(xs[ind], ind, xs)) { return true; }
        }
        return false;
    }),

    all = curry((p, xs) => {
        const limit = length(xs);
        let ind = 0;
        while (ind < limit && p(xs[ind], ind, xs)) { ind += 1; }
        return ind === limit;
    }),

    onListUntil = curry((pred, op, agg, arr) => {
        let ind = -1,
            result = agg;

        const limit = length(arr);

        while (++ind < limit && !pred(arr[ind], ind, arr)) {
            result = op(result, arr[ind], ind, arr);
        }

        return result;
    }),

    lastIndex = x => { const len = length(x); return len ? len - 1 : 0; },

    sliceFrom = curry((startInd, arr) => slice(startInd, length(arr), arr)),

    sliceFromZero = sliceFrom(0),

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

    sortDescByLength = getSortByOrder(DESC, x => length(x)),

    /**
     * Returns the lengths of all the items in an array.
     * @param arrs {...Array}
     * @type {Function}
     */
    lengths = curry2((...arrs) => length(arrs) ? arrs.map(length) : []),

    /**
     * Returns an ordered array (ascending or descending) with the lengths of all items passed in.
     * @param orderDir {Number} - 1 or -1 for ascending or descending.
     * @param arrs {...Array}
     * @returns {Array} - Array of lengths;
     */
    getOrderedLengths = curry2((orderDir, ...arrs) => (orderDir ? sortAsc : sortDesc)(lengths(arrs))),

    /**
     * Return a new set of arrays of the ones passed in sliced to the shortest ones length.
     * @param arrays {...Array}
     * @returns {Array<Array>}
     */
    trimLengths = (...arrays) => {
        const smallLen = getOrderedLengths(ASC, arrays)[0];
        return arrays.map(arr => length(arr) > smallLen ? slice(0, smallLen, arr) : sliceFromZero(arr));
    },

    /**
     * Returns head of array (first item of array).
     * @function module:arrayOperators.head
     * @param functor {Array|String}
     * @returns {*} - First item from array
     */
    head = functor => functor[0],

    /**
     * Returns tail part of array (everything after the first item as new array).
     * @function module:arrayOperators.tail
     * @param functor {Array}
     * @returns {Array}
     */
    tail = functor => sliceFrom(1, functor),

    /**
     * Returns everything except last item of array as new array.
     * @function module:arrayOperators.init
     * @param functor {Array|String}
     * @returns {Array|String}
     */
    init = functor => slice(0, lastIndex(functor), functor),

    /**
     * Returns last item of array.
     * @function module:arrayOperators.last
     * @param functor {Array|String}
     * @returns {*}
     */
    last = functor => functor[lastIndex(functor)],

    /**
     * Returns `head` and `tail` of passed in array/string in a tuple.
     * @param x {Array|String}
     * @returns {Array|String|Null}
     */
    uncons = x => {
        const len = length(x);
        if (len === 0) {
            return null;
        }
        return [head(x), tail(x)];
    },

    /**
     * Takes `n` items from start of array to `limit` (exclusive).
     * @function module:arrayOperators.take
     * @param array {Array|String}
     * @param limit {Number}
     * @returns {String|Array} - Passed in type's type
     */
    take = curry((limit, array) => slice(0, limit, array)),

    /**
     * Drops `n` items from start of array to `count` (exclusive).
     * @function module:arrayOperators.take
     * @param array {Array|String}
     * @param count {Number}
     * @returns {String|Array} - Passed in type's type
     */
    drop = curry((count, array) => sliceFrom(count, array)),

    /**
     * Splits `x` in two at given `index` (exclusive (includes element/character at
     * given index in second part of returned array)).
     * @param ind {Number} - Index to split at.
     * @param functor {Array|String} - functor (array or string) to split.
     * @returns {Array} - Array of whatever type `x` was when passed in
     */
    splitAt = curry((ind, arr) => [
        slice(0, ind, arr),
        sliceFrom(ind, arr)
    ]),

    /**
     * Finds index in string or array.
     * @function module:arrayOps.indexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    indexWhere = curry((pred, arr) => {
        let ind = -1,
            predicateFulfilled = false;
        const limit = length(arr);
        while (ind < limit && !predicateFulfilled) {
            predicateFulfilled = pred(arr[++ind], ind, arr);
        }
        return ind;
    }),

    /**
     * Finds index in string or array (alias for `findIndex`).
     * @function module:arrayOps.findIndex
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndex = indexWhere,

    partition = curry((pred, arr) => {
        const splitPoint = indexWhere(pred, arr);
        return splitPoint === -1 ?
            splitAt(0, arr) : splitAt(splitPoint, arr);
    }),

    /**
     * Gives an array with passed elements while predicate was true.
     * @function module:arrayOps.takeWhile
     * @param pred {Function} - Predicate<*, index, array|string>
     * @param arr {Array|String}
     * @returns {Array}
     */
    takeWhile = curry((pred, arr) => {
        let isArgArray = Array.isArray(arr),
            zero =  isArgArray ? [] : '';

        const operation = isArgArray ?
                aggregateArr : aggregateStr;

        return onListUntil (
            negateP(pred),  // predicate
            operation,      // operation
            zero,           // aggregator
            arr
        );
    }),

    dropWhile = curry((pred, arr) => {
        const limit = length(arr),
            splitPoint =
                indexWhere((item, ind, arr2) =>
                    !pred(arr[ind], ind, arr2), arr);

        return splitPoint === -1 ?
            slice(0, limit, arr) :
            slice(splitPoint, limit, arr);
    }),

    span = curry((pred, arr) => partition(pred, arr)),

    breakOnList = curry((pred, arr) => {
        const result = span(pred, arr);
        return [result[1], result[0]];
    }),

    intersperse = curry((between, arr) => {
        const limit = length(arr) - 1;
        return reduce((agg, item, ind) => {
            if (ind === limit) {
                agg.push(item);
            } else {
                agg.push(item, between);
            }
            return agg;
        }, []);
    }),

    intercalate = curry((xs, xss) =>
        apply(concat, intersperse(xs, xss))),

    transpose = xss => {
        const orderedLengths = getOrderedLengths(DESC, ...xss),
            out = new Array(orderedLengths[0]);
        return reduce((agg, item) =>
            reduce((agg2, element, ind2) => {
                agg2[ind2].push(element);
                return agg2;
            }, agg, item), out.map(_ => []), xss);
    },

    /**
     * Generates 2^n sub-sequences for passed in sequence (string/array) (`n` is
     * the length of the passed in sequence so: 2^length(xs)).
     * Note: The return value doubles per index/character passed in so use with caution!
     *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
     *  will generate 65536 sub-sequences!  So caution should be taken to not
     *  use this with sequences above a certain length on certain platform (the browser thread in specific).
     * @function subsequences
     * @param xs {Array|String}
     * @returns {Array}
     */
    subsequences = xs => {
        const len = Math.pow(2, length(xs)),
            out = [];
        for (let i = 0; i < len; i += 1) {
            const entry = [];
            for (let j = 0; j < len; j += 1) {
                if (i & (1 << j)) {
                    entry.push(xs[j]);
                }
            }
            out.push(entry);
        }
        return out;
    },

    permutations = xs => [xs],

    /**
     * Flattens an array.
     * @function module:arrayOperators.flatten
     * @param arr {Array}
     * @returns {Array}
     */
    flatten = arr => reduce((agg, elm) => {
        if (Array.isArray(elm)) {
            return concat(agg, flatten(elm));
        }
        agg.push(elm);
        return agg;
    }, [], arr),

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
    zip = curry((arr1, arr2) => {
        const {0: a1, 1: a2} = trimLengths(arr1, arr2);
        return reduce((agg, item, ind) => {
                agg.push([item, a2[ind]]);
            return agg;
        }, [], a1);
    }),

    zipN = curry2((...arrs) => {
        const lists = apply(trimLengths, arrs);
        return reduce((agg, arr, ind) => {
            if (!ind) {
                return zip (agg, arr);
            }
            return agg.map (arr2 => {
                arr.forEach (elm => {
                    arr2.push(elm);
                });
                return arr2;
            });
        }, lists.shift(), lists);
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

    and = all(isTruthy),

    or = any(isTruthy),

    not = all(isFalsy),

    equal = curry2((arg0, ...args) => all(x => arg0 === x, args)),

    sum = arr => {
        const parts = uncons(arr);
        return reduce((agg, x) => agg + x, parts[0], parts[1]);
    },

    product = arr => {
        const parts = uncons(arr);
        return reduce((agg, x) => agg * x, parts[0], parts[1]);
    },

    maximum = arr => apply(Math.max, arr),

    minimum = arr => apply(Math.min, arr),

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
     * Performs an intersection on array 1 with  elements from array 2.
     * @function module:arrayOperators.intersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    intersect = curry((arr1, arr2) => length(arr2) === 0 ? [] :
            filter(elm => arr2.indexOf(elm) > -1, arr1)),

    /**
     * Returns the difference of array 1 from array 2.
     * @function module:arrayOperators.difference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    difference = curry((array1, array2) => { // augment this with max length and min length ordering on op
        let [arr1, arr2] = sortDescByLength(array1, array2);
        if (!arr2 || length(arr2) === 0) {
            return sliceFromZero(arr1);
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
