import {curry2} from "../function/curry";
import {reduce} from "./utils";
import {append} from "./append";
import {difference} from "./difference";

export const

    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:list.complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    complement = curry2((arr0, ...arrays) =>
        reduce((agg, arr) => append(agg, difference(arr, arr0)), [], arrays));
