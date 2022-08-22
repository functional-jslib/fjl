/**
 * Returns a copy of the passed in list, though reversed.
 */
export const

  reverse = <T>(xs: T[]): T[] => {
    if (!xs || !xs.length) return [];

    const len = xs.length,
      out = new Array(len),
      lastIndex = len - 1;

    for (let i = len - 1; i >= 0; i -= 1) {
      out[lastIndex - i] = xs[i];
    }
    return out;
  };
