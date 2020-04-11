import {curry, CurryOf3} from "../../function";
import {sliceCopy} from "./sliceCopy";

export const

    /**
     * Returns an array with the given indices swapped.
     * @function module:list.$swapped
     * @param ind1 {Number}
     * @param ind2 {Number}
     * @param list {Array}
     * @returns {Array} - Copy of incoming with swapped values at indices.
     */
    $swapped = <T>(ind1: number, ind2: number, list: T[]): T[] => {
        const out = sliceCopy(list) as T[],
            tmp = out[ind1];
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
    swapped = curry($swapped) as CurryOf3<number, number, any[], any[]>

;
