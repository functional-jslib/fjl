import {splitAt} from "./splitAt";
import {OrderingFunc} from "./utils";
import {append} from "./append";
import {of} from "../object";
import {Slice} from "../types";

/**
 * A version of `insert` that allows you to specify the ordering of the inserted
 * item;  Before/at, or after
 */
export const insertBy = <T, TS extends Slice<T>>(
    orderingFn: OrderingFunc<T>, x: T, xs: TS
  ): TS => {
    const limit = xs.length;

    if (!limit) return of(xs, x);

    for (let ind = 0; ind < limit; ind += 1) {
      if (orderingFn(x, xs[ind] as T) <= 0) {
        const parts = splitAt(ind, xs);
        return append(parts[0], of(xs, x), parts[1]);
      }
    }
    return append(xs, of(xs, x));
  },

  $insertBy = <T, TS extends Slice<T>>(
    orderingFn: OrderingFunc<T>
  ) =>
    (x: T) =>
      (xs: TS): TS => insertBy(orderingFn, x, xs)

;
