import {curry, CurryOf2} from "../function";
import {negateF3} from "../function/negate";
import {findIndexWhere, sliceFrom} from "./utils";
import {of} from "../object/of";
import {reverse} from "./reverse";
import {splitAt} from "./splitAt";
import {SliceOf} from "../jsPlatform/slice";
import {PredForSliceOf} from "./types";

export type BreakOnList =
    CurryOf2<PredForSliceOf<any>, SliceOf<any>, [SliceOf<any>, SliceOf<any>]>;

/**
 * breakOnList, applied to a predicate p and a list xs, returns a tuple
 * where first element is longest prefix (possibly empty) of xs of elements
 * that do not satisfy p and second element is the remainder of the list:
 * @haskellExample
 * Replace `break` with `breakOnList` for our version.
 * ```
 * breakOnList (> 3) [1,2,3,4,1,2,3,4] == ([1,2,3],[4,1,2,3,4])
 * breakOnList (< 9) [1,2,3] == ([],[1,2,3])
 * breakOnList (> 9) [1,2,3] == ([1,2,3],[])
 * ```
 * @function module:list.breakOnList
 * @param pred {Function}
 * @param list {Array|String|*}
 * @returns {Array}
 */
export const breakOnList: BreakOnList = curry(<T>(pred: PredForSliceOf<T>, list: SliceOf<T>) => {
    const splitPoint = findIndexWhere(negateF3(pred), list);
    return splitPoint === -1 ?
        [of(list), sliceFrom(0, list)] : reverse(splitAt(splitPoint, list));
}) as BreakOnList;
