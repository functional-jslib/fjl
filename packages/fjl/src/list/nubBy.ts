import {any} from "./any";
import {BinaryPred} from "../types";
import {fromItems, ListOf, toItems} from "./utils/items";

export const

  /**
   * The nubBy function behaves just like nub, except it uses a user-supplied equality predicate.
   * The predicate is called as `pred(keptItem, item)`, as with Haskell's `nubBy`.
   */
  nubBy = <TS extends string | any[]>(pred: BinaryPred<TS[number]>, list: TS): ListOf<TS> => {
    const out: TS[number][] = [];

    for (const item of toItems(list)) {
      if (!any((kept: TS[number]) => pred(kept, item), out)) out.push(item);
    }

    return fromItems(list, out);
  },

  $nubBy = <T>(pred: BinaryPred<T>) =>
    <TS extends string | T[]>(list: TS): ListOf<TS> =>
      nubBy(pred, list)

;
