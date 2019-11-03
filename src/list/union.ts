import {curry} from "../function/curry";
import {append} from "./append";
import {filter} from "./filter";
import {includes} from "../jsPlatform/slice";

export const
    /**
     * Creates a union on matching elements from array1.
     * @function module:list.union
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    union = curry((arr1, arr2) =>
        append(arr1,
            filter(elm => !includes(elm, arr1), arr2)));
