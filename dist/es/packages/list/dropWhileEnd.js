import { curry } from "../function/curry";
import { findIndexWhereRight } from "./utils";
import { of } from "../object/of";
import { $sliceTo } from "./utils/sliceTo";
export const 
/**
 * @function module:list.dropWhileEnd
 * @param pred {Function} - Predicate<*, index, list|string>
 * @param list {Array|String}
 * @refactor
 * @returns {Array|String}
 */
dropWhileEnd = curry((p, list) => {
    const splitPoint = findIndexWhereRight((x, i, xs) => !p(x, i, xs), list);
    if (splitPoint === -1) {
        return of(list);
    }
    return $sliceTo(splitPoint + 1, list);
});
//# sourceMappingURL=dropWhileEnd.js.map