import { curry } from "../../function/curry";
import length from "../../platform/object/length";
export const 
/**
 * Finds index in list from right to left.
 * @function module:listUtils.$findIndexWhereRight
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {Array|String}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 */
$findIndexWhereRight = (pred, arr) => {
    let ind = length(arr) - 1;
    for (; ind >= 0; ind -= 1) {
        const predicateFulfilled = !!pred(arr[ind], ind, arr);
        if (predicateFulfilled) {
            return ind;
        }
    }
    return -1;
}, 
/**
 * Finds index in list from right to left.
 * @function module:listUtils.findIndexWhereRight
 * @param pred {Function} - Predicate<element, index, arr>.
 * @param arr {Array|String}
 * @returns {Number} - `-1` if predicate not matched else `index` found
 * @curried At upto 2 params.
 */
findIndexWhereRight = curry($findIndexWhereRight);
//# sourceMappingURL=findIndexWhereRight.js.map