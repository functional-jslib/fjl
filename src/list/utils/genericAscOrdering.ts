import {curry, CurryOf2} from "../../function";

export type OrderingFunc<T> = (a: T, b: T) => number;

export const

    /**
     * Generic ascending ordering func.
     * @function module:listUtils.$genericAscOrdering
     * @param a {any}
     * @param b {any}
     * @return {number} - -1, 0, 1
     */
    $genericAscOrdering = <T>(a: T, b: T): number => {
        if (a > b) {
            return 1;
        } else if (a < b) {
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
     * @curried
     */
    genericAscOrdering = curry($genericAscOrdering) as CurryOf2<any, any, number>

;
