import {negateF3} from "../function/negate";
import {findIndexWhere} from "./utils/findexIndexWhere";
import {reverse} from "./reverse";
import {splitAt} from "./splitAt";
import {TernaryPred} from "../types";

export const

  /**
   * `breakOnList`, applied to a predicate `p` and a list `xs`, returns a tuple
   * where first element is the longest prefix (possibly empty) of `xs` of elements
   * that do not satisfy `p` and second element is the remainder of the lisT.
   *
   * Example:
   *
   * ```javascript
   * breakOnList((x => x < 3), [1,2,3,4,1,2,3,4]) == [[1,2,3],[4,1,2,3,4]];
   * breakOnList((x => x < 9), [1,2,3]) == [[],[1,2,3]];
   * breakOnList((x => x > 9), [1,2,3]) == [[1,2,3],[]];
   * ```
   */
  breakOnList = <T, TS extends string | T[]>(
    pred: TernaryPred<T, number, TS>, xs: TS
  ): [typeof xs, typeof xs] => {
    const splitPoint = findIndexWhere(negateF3(pred), xs);
    return splitPoint === -1 ?
      [xs.slice(0, 0), xs.slice(0)] :
      reverse(splitAt(splitPoint, xs));
  },

  $breakOnList = <T, TS extends string | T[]>(
    pred: TernaryPred<T, number, TS>
  ) =>
    (xs: TS): [typeof xs, typeof xs] => breakOnList(pred, xs)
;
