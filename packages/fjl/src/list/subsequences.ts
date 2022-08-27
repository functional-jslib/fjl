import {Slice} from "../types";
import {of} from "../object";

export const
  /**
   * Generates 2^n sub-sequences for passed in sequence (string/list) (`n` is
   * the length of the passed in sequence so: 2^length(xs)).
   * Note: The return value doubles per index/character passed in so use with caution!
   *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
   *  will generate 65536 sub-sequences!  So caution should be taken to not
   *  use this with sequences above a certain length on certain platform (the browser thread in specific).
   */
  subsequences = <T>(xs: Slice<T>): Slice<T>[] => {
    const listLen = xs.length,
      len = Math.pow(2, listLen),
      out = [];

    for (let i = 0; i < len; i += 1) {
      let entry = of(xs);

      for (let j = 0; j < listLen; j += 1) {
        if (i & (1 << j)) {
          if (Array.isArray(entry)) entry.push(xs[j]);

          else entry = entry.concat(xs[j]);
        }
      }
      out.push(entry);
    }
    return out;
  };
