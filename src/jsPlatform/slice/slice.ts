import {toCurried3Method} from "../../utils/fnl-method-proxies";
import {SliceFunc} from "./types";

/**
 * Same as Array.prototype.slice
 * @function module:list.slice
 * @param startIndex {number}
 * @param endIndex {number}
 * @param slice {Slice|*}
 * @returns {Slice|*}
 */
const slice: SliceFunc = toCurried3Method('slice') as SliceFunc;

export default slice;
