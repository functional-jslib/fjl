import { curry } from "../function/curry";
import { length } from "../platform/object";
import { indexOf } from "../platform/slice";
export const 
/**
 * Checks if list `xs1` is a sub-sequence of list `xs2`
 * @function module:list.isSubsequenceOf
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @returns {boolean}
 */
isSubsequenceOf = curry((xs1, xs2) => {
    const len = Math.pow(2, length(xs2)), lenXs1 = length(xs1);
    let foundLen, i;
    for (i = 0; i < len; i += 1) {
        foundLen = 0;
        for (let j = 0; j < len; j += 1) {
            if (i & (1 << j) && indexOf(xs2[j], xs1) > -1) {
                foundLen += 1;
            }
            if (foundLen === lenXs1) {
                return true;
            }
        }
    }
    return false;
});
//# sourceMappingURL=isSubsequenceOf.js.map