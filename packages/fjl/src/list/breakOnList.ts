import {findIndex} from "./findIndex";
import {splitAt} from "./splitAt";
import {TernaryPred} from "../types";

export const

  /**
   * `breakOnList`, applied to a predicate `p` and a list `xs`, returns a tuple
   * where first element is the longest prefix (possibly empty) of `xs` of elements
   * that do not satisfy `p` and second element is the remainder of the list.  Same as Haskell's
   * `break`, so `breakOnList(p, xs)` is equivalent to `span(x => !p(x), xs)`.
   *
   * Example:
   *
   * ```javascript
   * breakOnList((x => x > 3), [1,2,3,4,1,2,3,4]) == [[1,2,3],[4,1,2,3,4]];
   * breakOnList((x => x < 9), [1,2,3]) == [[],[1,2,3]];
   * breakOnList((x => x > 9), [1,2,3]) == [[1,2,3],[]];
   * ```
   *
   * @see https://hackage-content.haskell.org/package/base-4.22.0.0/docs/Data-List.html
   */
  breakOnList = <T, TS extends string | T[]>(
    pred: TernaryPred<T, number, TS>,
    xs: TS
  ): [typeof xs, typeof xs] => {
    const splitPoint = findIndex(pred as TernaryPred, xs);
    return splitPoint === -1 ?
      [xs.slice(0) as TS, xs.slice(0, 0) as TS] :
      splitAt(splitPoint, xs);
  },

  $breakOnList = <T, TS extends string | T[]>(
    pred: TernaryPred<T, number, TS>
  ) =>
    (xs: TS): [typeof xs, typeof xs] => breakOnList(pred, xs)
;
