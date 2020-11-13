import { curry } from "../function/curry";
import { length } from "../platform/object";
import { findIndexWhere } from "./utils";
import { $slice } from "../platform/slice";
import { $sliceFrom } from "./utils/sliceFrom";
export const $dropWhile = (p, xs) => {
    const limit = length(xs), splitPoint = findIndexWhere((x, i, xs) => !p(x, i, xs), xs); // @todo make curry functions return "known" type (so we don't have to cast types)
    return splitPoint === -1 ?
        $sliceFrom(limit, xs) :
        $slice(splitPoint, limit, xs);
}, 
/**
 * Returns an list without elements that match predicate.
 * @function module:list.dropWhile
 * @param pred {Function} - Predicate<*, index, list|string>
 * @param list {Array|String}
 * @refactor
 * @returns {Array|String}
 */
dropWhile = curry($dropWhile);
//# sourceMappingURL=dropWhile.js.map