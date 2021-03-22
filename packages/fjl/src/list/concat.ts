import {append} from './append';
import {sliceCopy} from './utils/sliceCopy';
import {Slice} from "../platform/slice";

export const

  /**
   * Concatenates all the elements of a container of lists.
   */
  concat = <T>(xs: Slice<T>[]): Slice<T> => {
    let item0;
    switch (xs.length) {
      case undefined:
      case 0:
        return [] as unknown as Slice<T>;
      case 1:
        item0 = xs[0];
        return item0 && item0.slice ? sliceCopy(item0) : item0;
      case 2:
      default:
        return append(...xs) as Slice<T>;
    }
  }
;
