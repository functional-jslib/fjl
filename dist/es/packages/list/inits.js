import { length } from "../platform/object";
import { $sliceTo } from "./utils/sliceTo";
export const 
/**
 * The inits function returns all initial segments of the argument, shortest first. For example,
 * ```
 * shallowEquals(inits('abc'), ['','a','ab','abc'])
 * ```
 * @function module:list.inits
 * @haskellType `inits :: [a] -> [[a]]`
 * @param xs {SliceOf<any>}
 * @returns {SliceOf<any>|SliceOf<any>[]}
 */
inits = (xs) => {
    const limit = length(xs), agg = [];
    let ind = 0;
    if (!limit) {
        return [];
    }
    for (; ind <= limit; ind += 1) {
        agg.push($sliceTo(ind, xs));
    }
    return agg;
};
//# sourceMappingURL=inits.js.map