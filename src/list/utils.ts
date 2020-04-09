/**
 * ListLike operator utils module.
 * @module listUtils
 */
import {SliceOf, SlicePred} from '../jsPlatform/slice';      // un-curried version good for both strings and arrays
import {length} from '../jsPlatform/object';
import {alwaysFalse} from '../boolean';
import {map} from './map';
import {curry, curry2, CurryOf2, CurryOf3, CurryOf4} from '../function/curry';
import {PredForSliceOf} from "./types";
import {ReduceOp} from "../jsPlatform/array";
import {Lengthable} from "../types";
import {$sliceTo} from "./utils/sliceTo";
import {sliceCopy} from "./utils/sliceCopy";

export type ReduceUntil = CurryOf4<PredForSliceOf<any>,
    ReduceOp<any, SliceOf<any>, any>, any,
    SliceOf<any>, any>;

export const

    /**
     * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
     * @function module:listUtils.genericAscOrdering
     * @param a {*}
     * @param b {*}
     * @returns {number}
     */
    genericAscOrdering = curry((a, b) => {
        if (a > b) {
            return 1;
        } else if (a < b) {
            return -1;
        }
        return 0;
    }),

    /**
     * Returns length of all passed lists in list.
     * @function module:listUtils.lengths
     * @param lists ...{SliceOf<any>}
     * @returns {SliceOf<any>}
     */
    lengths = (...lists: string[] | [any[]] | any): number[] => map(length, lists),

    /**
     * Returns a list of lists trimmed to the shortest length in given list of lists.   @background This method is used by the `zip*` functions to achieve their
     *  'slice to smallest' functionality.
     * @function module:listUtils.toShortest
     * @param lists {...(SliceOf<any>)}
     * @returns {SliceOf<any>}
     */
    toShortest = curry2((...lists): [any[]] => {
        const listLengths = lengths(...lists),
            smallLen = Math.min(...listLengths);
        return map((list, ind) => listLengths[ind] > smallLen ?
            $sliceTo(smallLen, list) : sliceCopy(list), lists);
    }),

    /**
     * Reduces until predicate.
     * @function module:listUtils.reduceUntil
     * @param pred {Function} - `(item, index, list) => Boolean(...)`
     * @param op {Function} - Operation - `(agg, item, index, list) => agg`
     * @param agg {*} - Zero value.
     * @param xs {SliceOf<any>} - ListLike.
     * @returns {*}
     */
    reduceUntil = curry((pred, op, agg, xs) => {
        const limit = length(xs);
        if (!limit) {
            return agg;
        }
        let ind = 0,
            result = agg;
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                break;
            }
            result = op(result, xs[ind], ind, xs);
        }
        return result;
    }) as ReduceUntil,

    /**
     * Reduces until predicate (from right to left).
     * @function module:listUtils.reduceUntilRight
     * @param pred {Function} - `(item, index, list) => Boolean(...)`
     * @param op {Function} - Operation - `(agg, item, index, list) => agg`
     * @param agg {*} - Zero value.
     * @param xs {SliceOf<any>} - ListLike.
     * @returns {*}
     */
    reduceUntilRight = curry((pred, op, agg, arr) => {
        const limit = length(arr);
        if (!limit) {
            return agg;
        }
        let ind = limit - 1,
            result = agg;
        for (; ind >= 0; ind--) {
            if (pred(arr[ind], ind, arr)) {
                break;
            }
            result = op(result, arr[ind], ind, arr);
        }
        return result;
    }),

    /**
     * Reduces a list with given operation (`op`) function.
     * @function module:listUtils.reduce
     * @param op {Function} - Operation - `(agg, item, index, list) => agg`
     * @param agg {*} - Zero value.
     * @param xs {SliceOf<any>} - ListLike.
     * @returns {*}
     */
    reduce = reduceUntil(alwaysFalse),

    /**
     * Reduces a list with given operation (`op`) function (from right-to-left).
     * @function module:listUtils.reduceRight
     * @param op {Function} - Operation - `(agg, item, index, list) => agg`
     * @param agg {*} - Zero value.
     * @param xs {SliceOf<any>} - ListLike.
     * @returns {*}
     */
    reduceRight = reduceUntilRight(alwaysFalse),

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listUtils.lastIndex
     * @param x {SliceOf<any>} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = (x: Lengthable): number => {
        const len = length(x);
        return len ? len - 1 : 0;
    },

    /**
     * Finds index in string or list.
     * @function module:listUtils.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    findIndexWhere = curry(<T>(pred: SlicePred<T>, arr: SliceOf<T>): number => {
        let ind = 0;
        const limit = length(arr);
        for (; ind < limit; ind += 1) {
            const predicateFulfilled = !!pred(arr[ind], ind, arr);
            if (predicateFulfilled) {
                return ind;
            }
        }
        return -1;
    }) as CurryOf2<SlicePred<any>, SliceOf<any>, number>,

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
     * @param xs {SliceOf<any>} - list or list like.
     * @returns {Array|undefined}
     */
    findIndicesWhere = curry2(<T>(pred, xs: SliceOf<T>): number[] | undefined => {
        const limit = length(xs);
        let ind = 0;
        const out: any[] = [];
        for (; ind < limit; ind++) {
            if (pred(xs[ind], ind, xs)) {
                out.push(ind);
            }
        }
        return out.length ? out : undefined;
    }) as CurryOf2<SlicePred<any>, SliceOf<any>, number[] | undefined>,

    /**
     * @function module:listUtils.findWhere
     * @param pred {Function}
     * @param xs {SliceOf<any>} - list or list like.
     * @returns {*}
     */
    findWhere = curry((pred, xs) => {
        let ind = 0;
        const limit = length(xs);
        if (!limit) {
            return;
        }
        for (; ind < limit; ind++) {
            const elm = xs[ind];
            if (pred(elm, ind, xs)) {
                return elm;
            }
        }
        return undefined;
    }),

    /**
     * Returns an array with the given indices swapped.
     * @function module:list.swapped
     * @param ind1 {Number}
     * @param ind2 {Number}
     * @param list {Array}
     * @returns {Array} - Copy of incoming with swapped values at indices.
     */
    swapped = curry(<T>(ind1: number, ind2: number, list: T[]): T[] => {
        const out = sliceCopy(list) as T[],
            tmp = out[ind1];
        out[ind1] = out[ind2];
        out[ind2] = tmp;
        return out;
    }) as CurryOf3<number, number, any[], any[]>
;
