import { curry } from "../../function";
import { sliceCopy } from "./sliceCopy";
export const 
/**
 * Returns an array with the given indices swapped.
 * @function module:list.$swapped
 * @param ind1 {Number}
 * @param ind2 {Number}
 * @param list {Array}
 * @returns {Array} - Copy of incoming with swapped values at indices.
 */
$swapped = (ind1, ind2, list) => {
    const out = sliceCopy(list), tmp = out[ind1];
    out[ind1] = out[ind2];
    out[ind2] = tmp;
    return out;
}, 
/**
 * Returns an array with the given indices swapped.
 * @function module:list.swapped
 * @param ind1 {Number}
 * @param ind2 {Number}
 * @param list {Array}
 * @returns {Array} - Copy of incoming with swapped values at indices.
 * @curried at upto 3 params.
 */
swapped = curry($swapped);
//# sourceMappingURL=swapped.js.map