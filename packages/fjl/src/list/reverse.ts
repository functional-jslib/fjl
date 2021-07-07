import {isset} from '../object/isset';
import {of} from "../object/of";
import {typeOf} from "../object/typeOf";
import {Slice} from "../types";

export const

  /**
   * Returns a copy of the passed in list reverses.
   */
  reverse = <T>(xs: Slice<T>): Slice<T> => {
    if (!isset(xs) || !xs.length) {
      return xs;
    }
    let i = xs.length - 1;
    if (typeOf(xs) === 'String') {
      let out = of(xs) as string;
      for (; i >= 0; i -= 1) {
        out += xs[i];
      }
      return out;
    }
    const out = of(xs) as T[];
    for (; i >= 0; i -= 1) {
      out.push(xs[i] as T);
    }
    return out;
  };
