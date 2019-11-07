import {toCurried2Method} from "../../utils";
import {Filter} from "./types";

/**
 * Filters a functor (list etc.) with passed in function.
 * @function module:jsPlatform/array.filter
 * @param fn {Function}
 * @param functor {Array|{filter: {Function}}}
 * @returns {Array|{filter: {Function}}}
 */
const filter: Filter<any, any[]> = toCurried2Method('filter') as Filter<any, any[]>;

export default filter;
