import { curry } from "../../function/curry";
import length from "../../platform/object/length";
export const 
/**
 * Finds index in string or list.
 * @function module:listUtils.$findIndexWhere
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {SliceOf<any>}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 */
$findIndexWhere = (pred, arr) => {
    let ind = 0;
    const limit = length(arr);
    for (; ind < limit; ind += 1) {
        const predicateFulfilled = !!pred(arr[ind], ind, arr);
        if (predicateFulfilled) {
            return ind;
        }
    }
    return -1;
}, 
/**
 * Finds index in string or list.
 * @function module:listUtils.findIndexWhere
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {Array|String}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 * @curried Upto two args.
 */
findIndexWhere = curry($findIndexWhere);
//# sourceMappingURL=findexIndexWhere.js.map