import {append} from './append';
import {sliceCopy} from './utils/sliceCopy';
import {Slice} from "../types";

export const

  /**
   * Concatenates all the elements of a container of lists.
   */
  concat = <T, XS extends Slice<T>>(xs: XS[]): XS => {
    if (!xs || !xs.length) {
      return [] as unknown as XS;
    } else if (xs.length === 1) {
      const item0 = xs[0];
      return item0 && item0.slice ? sliceCopy(item0) : item0;
    }
    return append(...xs) as XS;
  }
;
