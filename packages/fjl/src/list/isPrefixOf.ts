import {curry} from "../function/curry";
import {length} from "../platform/object";
import {indexOf} from "../platform/slice";

export const
    /**
     * Checks if list `xs1` is a prefix of list `xs2`
     * @function module:list.isPrefixOf
     * @param xs1 {Array|String|*}
     * @param xs2 {Array|String|*}
     * @returns {boolean}
     */
    isPrefixOf = curry((xs1, xs2) => {
        const limit1 = length(xs1),
            limit2 = length(xs2);
        if (limit2 < limit1 || !limit1 || !limit2 || indexOf(xs2, xs1[0]) === -1) {
            return false;
        }
        let ind = 0;
        for (; ind < limit1; ind++) {
            if (xs1[ind] !== xs2[ind]) {
                return false;
            }
        }
        return true;
    });
