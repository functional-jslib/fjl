export const
  /**
   * Creates a union of incoming arrays.
   */
  union = <T>(arr1: T[], arr2: T[]): T[] => {
    const lim1 = arr1.length,
      lim2 = arr2.length,
      lim = Math.max(lim1, lim2),
      out = []
    ;
    for (let i = 0; i < lim; i += 1) {
      const a = arr1[i],
        b = arr2[i],
        aiOk = i < lim1,
        biOk = i < lim2
      ;
      if (aiOk && !out.includes(a)) {
        out.push(a);
      }
      if (biOk && !out.includes(b)) {
        out.push(b);
      }
    }
    return out;
  },

  $union = <T>(arr1: T[]) =>
    (arr2: T[]): T[] => union(arr1, arr2)
;
