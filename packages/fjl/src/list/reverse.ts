/**
 * Returns a copy of the passed in list, though reversed.
 */
export const

  reverse = <T>(xs: T[]): T[] => {
    if (!xs || !xs.length) return [];

    let i = xs.length - 1;

    const len = xs.length - 1,
      out = new Array(len);

    for (; i >= 0; i -= 1) {
      out[len - i] = xs[i];
    }
    return out;
  };
