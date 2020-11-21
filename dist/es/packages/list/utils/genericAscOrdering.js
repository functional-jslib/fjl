import { curry } from "../../function/curry";
export const 
/**
 * Generic ascending ordering func.
 * @function module:listUtils.$genericAscOrdering
 * @param a {any}
 * @param b {any}
 * @return {number} - -1, 0, 1
 */
$genericAscOrdering = (a, b) => {
    if (a > b) {
        return 1;
    }
    else if (a < b) {
        return -1;
    }
    return 0;
}, 
/**
 * Generic 'ascending order' ordering function (use by the likes of `list.sort` etc.)
 * @function module:listUtils.genericAscOrdering
 * @param a {*}
 * @param b {*}
 * @returns {number} - -1, 0, 1
 * @curried At upto 2 params.
 */
genericAscOrdering = curry($genericAscOrdering);
//# sourceMappingURL=genericAscOrdering.js.map