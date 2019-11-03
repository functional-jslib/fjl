import {toCurried2Method} from "../../utils";
import {FilterFunc} from "../../types";
import {CurryOf2} from "../../function";

export type ArrayFilterFunc<T> = FilterFunc<T, Array<T>>;

export type ArrayFilterType<T> =  CurryOf2<ArrayFilterFunc<T>, Array<T>, Array<T>>

/**
 * Filters a functor (list etc.) with passed in function.
 * @function module:jsPlatform/array.filter
 * @param fn {Function}
 * @param functor {Array|{filter: {Function}}}
 * @returns {Array|{filter: {Function}}}
 */
const filter: ArrayFilterType<any> = toCurried2Method('filter') as ArrayFilterType<any>;

export default filter;
