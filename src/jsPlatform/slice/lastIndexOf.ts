import {toCurried2Method} from "../../utils";
import {Slice} from "../../types";

/**
 * Gets the last index of a given item in list-like.
 * @function module:list.lastIndexOf
 * @param x {*} - Element to search for.
 * @param xs {Array|String|*} - list or list like to look in.
 * @returns {Number} - `-1` if element not found else index at which it is found.
 */
const lastIndexOf: (x: any, xs: Slice, fromIndex?: number) => number =
    toCurried2Method('lastIndexOf');

export default lastIndexOf;
