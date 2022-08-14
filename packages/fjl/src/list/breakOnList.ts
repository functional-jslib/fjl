import {negateF3} from "../function/negate";
import {findIndexWhere} from "./utils/findexIndexWhere";
import {of} from "../object/of";
import {reverse} from "./reverse";
import {splitAt} from "./splitAt";
import {Slice, PredForSlice} from "../types";
import {sliceFrom} from "./utils/sliceFrom";

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
  breakOnList = <X, XS extends Slice<X>>(pred: PredForSlice<X>, list: XS): [XS, XS] => {
    const splitPoint = findIndexWhere(negateF3(pred), list);
    return splitPoint === -1 ?
      [of(list), sliceFrom(0, list)] : reverse(splitAt(splitPoint, list));
  },

  $breakOnList = <T, XS extends Slice<T>>(pred: PredForSlice<T>) =>
    (list: XS): [XS, XS] => breakOnList(pred, list)
;
