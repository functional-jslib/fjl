/**
 * ListLike operator utils module.
 * @module listUtils
 */
import {SliceOf, SlicePred} from '../jsPlatform/slice';      // un-curried version good for both strings and arrays
import {length} from '../jsPlatform/object';
import {alwaysFalse} from '../boolean';
import {curry, curry2, CurryOf2, CurryOf3} from '../function/curry';
import {Lengthable} from "../types";
import {sliceCopy} from "./utils/sliceCopy";
import {genericAscOrdering} from "./utils/genericAscOrdering";
import {lengths} from "./utils/lengths";
import {toShortest} from "./utils/toShortest";
import {reduceUntil, ReduceUntil} from "./utils/reduceUntil";
import {reduceUntilRight, ReduceUntilRight} from "./utils/reduceUntilRight";

export {genericAscOrdering, lengths, toShortest, reduceUntil, ReduceUntil, ReduceUntilRight};

export const

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
