import {toCurried2Method} from "../../utils";
import {Slice} from "../../types";

/**
 * Searches list/list-like for given element `x`.
 * @function module:list.indexOf
 * @param x {*} - Element to search for.
 * @param xs {Array|String|*} - List like to search in.
 * @returns {Number} - `-1` if element not found else index at which it is found.
 */
const indexOf: (x: any, xs: Slice, fromIndex?: number) => number =
    toCurried2Method('indexOf')
;

export default indexOf;
