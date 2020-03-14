import {toCurried3Method} from "../../utils/fnl-method-proxies";
import {SliceFunc} from "./types";

/**
 * Same as Array.prototype.slice
 * @function module:list.slice
 * @param startIndex {number}
 * @param endIndex {number}
 * @param slice {Slice<any>|*}
 * @returns {SliceOf<any>>|*}
 */
const slice: SliceFunc<unknown> =
    toCurried3Method('slice') as SliceFunc<unknown>;

export default slice;
