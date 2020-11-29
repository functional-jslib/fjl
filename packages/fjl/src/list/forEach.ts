import {curry} from "../function/curry";
import {length} from "../platform/object";

export const

    /**
     * For each function (same as `[].forEach` except in functional format).
     * @function module:list.forEach
     * @param fn {Function} - Operation (`(element, index, list) => {...}`, etc.)
     * @param xs {(Array|String)}
     * @returns {void}
     */
    forEach = curry((fn, list) => {
        const limit = length(list);
        if (!limit) {
            return;
        }
        let ind = 0;
        for (; ind < limit; ind += 1) {
            fn(list[ind], ind, list);
        }
    })

;
