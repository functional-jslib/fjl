import {toCurried2Method} from "../../utils";
import {IndexOfFunc} from "./types";

/**
 * Searches list/list-like for given element `x`.
 * @function module:list.indexOf
 * @param x {*} - Element to search for.
 * @param xs {Array|String|*} - List like to search in.
 * @param xs {Array|String|*} - List like to search in.
 * @param [fromIndex=0]{number} - Number to search from.  Default `0`.
 * @returns {Number} - `-1` if element not found else index at which it is found.
 */
const indexOf: IndexOfFunc<any> =
    toCurried2Method('indexOf') as IndexOfFunc<any>
;

export default indexOf;
