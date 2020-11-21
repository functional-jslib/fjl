import { reduceUntilRight } from "./reduceUntilRight";
import alwaysFalse from "../../boolean/alwaysFalse";
export const 
/**
 * Reduces a list with given operation (`op`) function (from right-to-left).
 * @function module:listUtils.reduceRight
 * @param op {Function} - Operation - `(agg, item, index, list) => agg`
 * @param agg {*} - Zero value.
 * @param xs {SliceOf<any>} - ListLike.
 * @returns {*}
 * @curried
 */
reduceRight = reduceUntilRight(alwaysFalse);
//# sourceMappingURL=reduceRight.js.map