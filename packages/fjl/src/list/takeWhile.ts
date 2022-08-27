import {negateF3} from "../function/negate";
import {reduceUntil} from "./utils";
import {isString} from "../object/is";
import {of} from "../object/of";
import {push} from "./push";
import {TernaryPred} from "../types";

export const

  /**
   * Gives an list with passed elements while predicate was true.
   */
  takeWhile = <T>(pred: TernaryPred, xs: T[]): T[] =>
    reduceUntil(
      negateF3(pred),
      isString(xs) ?
        (agg, x) => ((agg as unknown as string) + x) as unknown as T[]:
        (agg, x): T[] => push(x, agg as T[]),
      of(xs),
      xs
    ),

  $takeWhile = <T>(pred: TernaryPred) =>
    (xs: T[]): T[] =>
      takeWhile(pred, xs);
