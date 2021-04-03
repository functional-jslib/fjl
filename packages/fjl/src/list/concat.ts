import {append} from './append';
import {sliceCopy} from './utils/sliceCopy';
import {Slice} from "../types/native";

export const

  /**
   * Concatenates all the elements of a container of lists.
   */
  concat = <T>(xs: Slice<T>[]): Slice<T> => {
    if (!xs || !xs.length) {
      return [] as unknown as Slice<T>;
    } else if (xs.length === 1) {
      const item0 = xs[0];
      return item0 && item0.slice ? sliceCopy(item0) : item0;
    }
    return append(...xs) as Slice<T>;
  }
;
