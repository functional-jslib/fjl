import {Slice} from "../types";
import {typeOf} from "../object";

export const

  /**
   * Returns a copy of the passed in list reverses.
   */
  reverse = <T, T1 extends Slice<T> = Slice<T>>(xs: T1): T1 => {
    if (!xs) return xs;
    if (!xs.length) return xs.slice(0) as T1;
    let i = xs.length - 1;
    let out;
    if (typeOf(xs) === 'String') {
      out = '';
      for (; i >= 0; i -= 1) {
        out += xs[i];
      }
    } else {
      const len = xs.length - 1;
      out = new Array(len);
      for (; i >= 0; i -= 1) {
        out[len - i] = xs[i];
      }
    }
    return out;
  };
