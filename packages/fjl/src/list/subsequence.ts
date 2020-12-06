import {length} from "../platform/object";
import {SliceOf} from "../platform";

export const
  /**
   * Generates 2^n sub-sequences for passed in sequence (string/list) (`n` is
   * the length of the passed in sequence so: 2^length(xs)).
   * Note: The return value doubles per index/character passed in so use with caution!
   *  Also note that for 2^16 (or for a sequence of 16 characters) this algorithm
   *  will generate 65536 sub-sequences!  So caution should be taken to not
   *  use this with sequences above a certain length on certain platform (the browser thread in specific).
   */
  subsequences = <T>(xs: SliceOf<T>): SliceOf<T>[] => {
    const listLen = length(xs),
      len = Math.pow(2, listLen),
      out: any[] = [];
    for (let i = 0; i < len; i += 1) {
      const entry: any[] = [];
      for (let j = 0; j < listLen; j += 1) {
        if (i & (1 << j)) {
          entry.push(xs[j]);
        }
      }
      out.push(entry);
    }
    return out;
  };
