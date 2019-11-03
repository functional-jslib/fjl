import {toCurried3Method} from "../../utils/fnl-method-proxies";
import {Slice} from "../../types";

/**
 * Same as Array.prototype.slice
 * @function module:list.slice
 * @param startIndex {number}
 * @param endIndex {number}
 * @param slice {Slice|*}
 * @returns {Slice|*}
 */
const slice: (startIndex: number, endIndex: number, s: Slice) => Slice =
    toCurried3Method('slice');

export default slice;
