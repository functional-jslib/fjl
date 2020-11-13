import { curry } from "../../function/curry";
import { $slice } from "../../platform/slice";
export const 
/**
 * Slices from index `0` to given index.
 * @function module:listUtils.$sliceTo
 * @param toInd {number}
 * @param xs {SliceOf<any>}
 * @returns {SliceOf<any>}
 * @generic
 */
$sliceTo = (toInd, xs) => $slice(0, toInd, xs), 
/**
 * Slices from index `0` to given index.
 * @function module:listUtils.sliceTo
 * @param toInd {number}
 * @param xs {SliceOf<any>}
 * @returns {SliceOf<any>}
 * @curried
 * @generic
 */
sliceTo = curry($sliceTo);
//# sourceMappingURL=sliceTo.js.map