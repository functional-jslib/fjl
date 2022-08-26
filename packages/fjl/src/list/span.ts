import {negateF3} from "../function/negate";
import {findIndexWhere} from "./utils";
import {of} from "../object/of";
import {splitAt} from "./splitAt";
import {sliceFrom} from "./utils/sliceFrom";
import {PredForArray} from "../types";

export const

  /**
   * Gives you the `span` of items matching predicate
   * and items not matching predicate;  E.g., Gives an
   * array of arrays;  E.g., [[matching-items], [non-matching-items]]
   */
  span = <T>(pred: PredForArray<T>, list: T[]): [T[], T[]] => {
    const splitPoint = findIndexWhere(negateF3(pred), list) as number;
    return splitPoint === -1 ?
      [sliceFrom(0, list), of(list)] :
      splitAt(splitPoint, list);
  },

  $span = <T>(pred: PredForArray<T>) =>
    (list: T[]): [T[], T[]] => span(pred, list);
