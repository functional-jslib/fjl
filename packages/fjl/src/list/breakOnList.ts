import {negateF3} from "../function/negate";
import {findIndexWhere} from "./utils/findexIndexWhere";
import {of} from "../object/of";
import {reverse} from "./reverse";
import {splitAt} from "./splitAt";
import {TernaryPred} from "../types";
import {sliceFrom} from "./utils/sliceFrom";

export const

  /**
   * `breakOnList`, applied to a predicate `p` and a list `xs`, returns a tuple
   * where first element is the longest prefix (possibly empty) of `xs` of elements
   * that do not satisfy `p` and second element is the remainder of the list:
   * Replace `break` with `breakOnList` for our version.
   *
   * Example:
   *
   * ```javascript
   * breakOnList((x => x < 3), [1,2,3,4,1,2,3,4]) == [[1,2,3],[4,1,2,3,4]];
   * breakOnList((x => x < 9), [1,2,3]) == [[],[1,2,3]];
   * breakOnList((x => x > 9), [1,2,3]) == [[1,2,3],[]];
   * ```
   */
  breakOnList = <T>(pred: TernaryPred<T, number, T[]>, list: T[]): [T[], T[]] => {
    const splitPoint = findIndexWhere(negateF3(pred), list);
    return splitPoint === -1 ?
      [of(list), sliceFrom(0, list)] : reverse(splitAt(splitPoint, list));
  },

  $breakOnList = <T>(pred: TernaryPred<T, number, T[]>) =>
    (list: T[]): [T[], T[]] => breakOnList(pred, list)
;
