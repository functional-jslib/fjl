import {negateF3} from "../function/negate";
import {findIndexWhere} from "./utils/findexIndexWhere";
import {reverse} from "./reverse";
import {splitAt} from "./splitAt";
import {TernaryPred} from "../types";

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
  breakOnList = <T, TS extends T[]>(pred: TernaryPred<T, number, T[]>, list: TS): [TS, TS] => {
    const splitPoint = findIndexWhere(negateF3(pred), list);
    return splitPoint === -1 ?
      [list.slice(0, 0), list.slice(0)] as [TS, TS] : reverse(splitAt(splitPoint, list)) as [TS, TS];
  },

  $breakOnList = <T>(pred: TernaryPred<T, number, T[]>) =>
    (list: T[]): [T[], T[]] => breakOnList(pred, list)
;
