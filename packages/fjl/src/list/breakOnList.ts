import {curry, CurryOf2} from "../function/curry";
import {negateF3} from "../function/negate";
import {findIndexWhere} from "./utils/findexIndexWhere";
import {of} from "../object/of";
import {reverse} from "./reverse";
import {splitAt} from "./splitAt";
import {Slice, PredForSlice} from "../types";
import {sliceFrom} from "./utils/sliceFrom";

export type BreakOnList<Pred, Functor> = CurryOf2<Pred, Functor, [Functor, Functor]>;

export const

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
   */
  breakOnList = <T>(pred: PredForSlice<T>, list: Slice<T>): [Slice<T>, Slice<T>] => {
    const splitPoint = findIndexWhere(negateF3(pred), list) as number;
    return splitPoint === -1 ?
      [of(list), sliceFrom(0, list)] : reverse(splitAt(splitPoint, list)) as [Slice<T>, Slice<T>];
  },

  $breakOnList = curry(breakOnList) as BreakOnList<PredForSlice<any>, Slice>
;
