/**
 * Gets item at index;  Same as` [].at()` (allows negative/right-to-left indexing (see mdn (Array|String).at method).
 */
export const at = (i: number, xs) => xs.at(i),

  /**
   * Curried version of `at`.
   */
  $at = (i: number) => (xs) => xs.at(i);
