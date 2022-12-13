/**
 * Gets item at index;  Same as` [].at()` (allows negative/right-to-left indexing (see mdn Array.at method).
 */
export const at = <T>(i: number, xs: T[]): T => xs.at(i),

  /**
   * Curried version of `at`.
   */
  $at = <T>(i: number) => (xs: T[]): T => xs.at(i);
