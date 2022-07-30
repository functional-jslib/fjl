import {length} from "./length";
import {splitAt} from "./splitAt";
import {concat} from "./concat";
import {push} from "./push";
import {sliceCopy} from "./utils/sliceCopy";
import {OrderingFunc} from "./utils";
import {Slice} from "../types";
import {of} from "../object/of";
import {typeOf} from "../object/typeOf";

/**
 * A version of `insert` that allows you to specify the ordering of the inserted
 * item;  Before/at, or after
 */
export const insertBy = <T>(orderingFn: OrderingFunc<T>, x: T, xs: Slice<T>): Slice<T> => {
    const limit = length(xs);
    if (!limit) {
      switch (typeOf(xs)) {
        case String.name:
          return `${x}` as unknown as Slice<T>;
        default:
          return (of(xs) as T[]).concat([x]);
      }
    }
    let ind = 0;
    for (; ind < limit; ind += 1) {
      if (orderingFn(x, xs[ind] as T) <= 0) {
        const parts = splitAt(ind, xs);
        return concat([parts[0], [x], parts[1]]) as Slice<T>;
      }
    }
    return push(x, sliceCopy(xs) as T[]) as Slice<T>;
  },

  $insertBy = <T>(orderingFn: OrderingFunc<T>) =>
    (x: T) =>
      (xs: Slice<T>): Slice<T> => insertBy(orderingFn, x, xs)

;
