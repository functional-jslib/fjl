import {negateF3} from "../function/negate";
import {findIndex} from "./findIndex";
import {of} from "../object/of";
import {splitAt} from "./splitAt";
import {sliceFrom} from "./utils/sliceFrom";
import {TernaryPred} from "../types";

export const

  /**
   * Gives you the `span` of items matching predicate
   * and items not matching predicate;  E.g., Gives an
   * array of arrays;  E.g., given list of 'xs' - [[matching-xs-items], [non-matching-xs-items]]
   */
  span = <TS extends string | any[]>(pred: TernaryPred<TS[number], number, TS>, xs: TS): [TS, TS] => {
    const splitPoint = findIndex(negateF3(pred), xs);
    return splitPoint === -1 ?
      [sliceFrom(0, xs), of(xs)] :
      splitAt(splitPoint, xs);
  },

  $span = <TS extends string | any[]>(pred: TernaryPred<TS[number], number, TS>) =>
    (list: TS): [TS, TS] => span(pred, list);
