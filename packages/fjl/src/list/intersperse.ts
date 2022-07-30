import {of} from "../object/of";
import {isString} from "../object/is";
import {Slice} from "../types";

export const

  /**
   * Takes an element and a list and `intersperses' that element between the
   *  elements of the list.
   */
  intersperse = <T>(between: T, xs: Slice<T>): Slice<T> => {
    if (!xs || !xs.length) {
      return xs;
    }
    const limit = xs.length,
      lastInd = limit - 1;
    let i = 0;
    if (isString(xs)) {
      let out = '';
      for (; i < limit; i += 1) {
        out += i === lastInd ?
          xs[i] :
          (xs[i] as unknown as string) +  // @todo type conversion cleanup
          (between as unknown as string); // @todo ""
      }
      return out as unknown as Slice<T>;
    }
    const out = of(xs) as Array<T>;
    for (; i < limit; i += 1) {
      if (i === lastInd) {
        out.push(xs[i] as T);
      } else {
        out.push(xs[i] as T, between);
      }
    }
    return out;
  },

  $intersperse = <T>(between: T) =>
    (xs: Slice<T>): Slice<T> => intersperse(between, xs)

;
