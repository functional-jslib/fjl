/**
 * Equality combinator.
 */
export const equal = <T = any>(a: T, b: T): boolean => a === b,

  /**
   * Curried version of `equal`
   */
  $equal = <T = any>(a: T) => (b: T): boolean => a === b;
