import {any} from "./any";
import {BinaryPred} from "../types";
import {fromItems, ListOf, toItems} from "./utils/items";

/**
 * Returns the items of `xs1` that match an item of `xs2`, by predicate, called as
 * `pred(itemOfXs1, itemOfXs2)`.  Duplicates in `xs1` stay.
 */
export const intersectBy = <TS extends string | any[]>(pred: BinaryPred<TS[number]>, xs1: TS, xs2: TS): ListOf<TS> => {
    const others = toItems(xs2);
    return fromItems(xs1, toItems(xs1).filter((a: TS[number]) =>
      any((b: TS[number]) => pred(a, b), others)
    ));
  },

  /**
   * Curried version of `intersectBy`.
   */
  $intersectBy = <T>(pred: BinaryPred<T>) =>
    <TS extends string | T[]>(xs1: TS) =>
      (xs2: TS): ListOf<TS> => intersectBy(pred, xs1, xs2);
