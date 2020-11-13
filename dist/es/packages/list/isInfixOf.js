import { curry } from "../function/curry";
import { length } from "../platform/object";
export const 
/**
 * Checks if list `xs1` is an infix of list `xs2`
 * @function module:list.isInfixOf
 * @param xs1 {Array|String|*}
 * @param xs2 {Array|String|*}
 * @returns {boolean}
 */
isInfixOf = curry((xs1, xs2) => {
    const limit1 = length(xs1), limit2 = length(xs2);
    if (limit2 < limit1 || !limit1 || !limit2) {
        return false;
    }
    let ind1, foundLen, ind = 0;
    for (; ind < limit2; ind += 1) {
        foundLen = 0;
        for (ind1 = 0; ind1 < limit1; ind1 += 1) {
            if (xs2[ind1 + ind] === xs1[ind1]) {
                foundLen += 1;
            }
            if (foundLen === limit1) {
                return true;
            }
        }
    }
    return false;
});
//# sourceMappingURL=isInfixOf.js.map