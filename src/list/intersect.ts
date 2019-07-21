import {curry} from "../function/curry";
import {filter} from "./filter";
import {includes} from "../jsPlatform/list";

export const
    /**
     * Performs an intersection on list 1 with  elements from list 2.
     * @function module:list.intersect
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    intersect = curry((arr1, arr2) =>
        !arr1 || !arr2 || (!arr1 && !arr2) ? [] :
            filter(elm => includes(elm, arr2), arr1));
