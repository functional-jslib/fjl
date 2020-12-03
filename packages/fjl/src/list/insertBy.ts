import {curry, CurryOf3} from "../function/curry";
import {length} from "../platform/object";
import {splitAt} from "./splitAt";
import {concat} from "./concat";
import {push} from "./push";
import {sliceCopy} from "./utils/sliceCopy";
import {OrderingFunc} from "./utils";
import {SliceOf} from "../platform/slice";
import {of} from "../object/of";
import {typeOf} from "../object/typeOf";

export const

  $insertBy = <T>(orderingFn: OrderingFunc<T>, x: T, xs: SliceOf<T>): SliceOf<T> => {
    const limit = length(xs);
    if (!limit) {
      switch (typeOf(xs)) {
        case String.name:
          return `${x}` as unknown as SliceOf<T>;
        default:
          return (of(xs) as T[]).concat([x]);
      }
    }
    let ind = 0;
    for (; ind < limit; ind += 1) {
      if (orderingFn(x, xs[ind] as T) <= 0) {
        const parts = splitAt(ind, xs);
        return concat([parts[0], [x], parts[1]]) as SliceOf<T>;
      }
    }
    return push(sliceCopy(xs), x) as SliceOf<T>;
  },

  /**
   * A version of `insert` that allows you to specify the ordering of the inserted
   * item;  Before/at, or after
   */
  insertBy = curry($insertBy) as CurryOf3<OrderingFunc<any>, any, SliceOf<any>, SliceOf<any>>;
