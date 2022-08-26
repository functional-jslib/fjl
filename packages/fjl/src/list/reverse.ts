/**
 * Returns a copy of the passed in list, though reversed.
 */
import {ArrayType, ArrayTypeConstructor} from "../types";

export const

  reverse = <T, TS extends ArrayType<T>>(xs: TS): TS => {
    const len = xs.length,
      out = new (xs.constructor as ArrayTypeConstructor)(len) as TS,
      lastIndex = len - 1;

    for (let i = len - 1; i >= 0; i -= 1) {
      out[lastIndex - i] = xs[i];
    }
    return out;
  };
