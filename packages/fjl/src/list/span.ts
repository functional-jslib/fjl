import {negateF3} from "../function/negate";
import {findIndexWhere} from "./utils";
import {of} from "../object/of";
import {splitAt} from "./splitAt";
import {sliceFrom} from "./utils/sliceFrom";
import {Slice, TernaryPred} from "../types";

export const

  /**
   * Gives you the `span` of items matching predicate
   * and items not matching predicate;  E.g., Gives an
   * array of arrays;  E.g., given list of 'xs' - [[matching-xs-items], [non-matching-xs-items]]
   */
  span = <T, TS extends Slice<T>>(pred: TernaryPred, xs: TS): [TS, TS] => {
    const splitPoint = findIndexWhere(negateF3(pred), xs);
    return splitPoint === -1 ?
      [sliceFrom(0, xs), of(xs)] :
      splitAt(splitPoint, xs);
  },

  $span = <T, TS extends Slice<T>>(pred: TernaryPred) =>
    (list: TS): [TS, TS] => span(pred, list);
