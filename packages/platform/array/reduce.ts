import {toCurried3Method} from "../../utils";
import {Reduce} from "./types";

/**
 * Functional reduce.  Same as `[].reduce` except it takes The reduction function first,
 *  the functor second, and a zero value as third.
 * @function module:platform.array.reduce
 * @param fn {ReduceOp<T, Ftr, RetT>>>} - Reduction function; `(agg, x, i, xs) => any`
 * @param zero {any} - Value to start reduction with.
 * @param functor {Array|{reduce: {Function}}}
 * @returns {Array|{reduce: {Function}}}
 */
const reduce = toCurried3Method('reduce') as Reduce<any, any[], any>;

export default reduce;
