import {Lengthable} from "../../types";
import length from "../../jsPlatform/object/length";

export const

    /**
     * Gets last index of a list/list-like (Array|String|Function etc.).
     * @function module:listUtils.lastIndex
     * @param x {SliceOf<any>} - list like or list.
     * @returns {Number} - `-1` if no element found.
     */
    lastIndex = (x: Lengthable): number => {
        const len = length(x);
        return len ? len - 1 : 0;
    }
;
