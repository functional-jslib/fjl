import {toCurried2Method} from "../../utils";
import {CurryOf3} from "../../function";

export type ReduceFunc<T, Ftr, Ret> = (agg: T, x: T, i: number, xs: Ftr) => Ret

export type ReduceType<T, Ftr, Ret> = CurryOf3<ReduceFunc<T, Ftr, Ret>, number, Ftr, Ret>

/**
 * Functional reduce.  Same as `[].reduce` except it takes The reduction function first,
 *  the functor second, and a zero value as third.
 * @function module:jsPlatform.array.reduce
 * @param fn {ReduceFunc}
 * @param zero {any} - Value to start reduction with.
 * @param functor {Array|{reduce: {Function}}}
 * @returns {Array|{reduce: {Function}}}
 */
const reduce: ReduceType<any, any[], any> =
    toCurried2Method('reduce') as CurryOf3<ReduceFunc<any, any[], any>, number, any[], any>;

export default reduce;
