import {curry, CurryOf2} from "../function/curry";
import {negateF3} from "../function/negate";
import {findIndexWhere} from "./utils/findexIndexWhere";
import {of} from "../object/of";
import {reverse} from "./reverse";
import {splitAt} from "./splitAt";
import {Slice, SlicePred} from "../platform/slice/types";
import {$sliceFrom} from "./utils/sliceFrom";

export type BreakOnList<Pred, Functor> = CurryOf2<Pred, Functor, [Functor, Functor]>;

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
export const breakOnList = curry(
    <T>(pred: SlicePred<T>, list: Slice<T>): [Slice<T>, Slice<T>] => {
        const splitPoint = findIndexWhere(negateF3(pred), list) as number;
        return splitPoint === -1 ?
            [of(list), $sliceFrom(0, list)] : reverse(splitAt(splitPoint, list));
    }) as BreakOnList<SlicePred<any>, Slice<any>>
;
