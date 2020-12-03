import {reduceUntil} from "./reduceUntil";
import {alwaysFalse} from "../../boolean/alwaysFalse";

export const

    /**
     * Reduces a list with given operation (`op`) function.
     * @function module:listUtils.reduce
     * @param op {Function} - Operation - `(agg, item, index, list) => agg`
     * @param agg {*} - Zero value.
     * @param xs {SliceOf<any>} - ListLike.
     * @returns {*}
     */
    reduce = reduceUntil(alwaysFalse)

;
