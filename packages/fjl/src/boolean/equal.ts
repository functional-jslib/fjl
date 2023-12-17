/**
 * Equality combinator.
 */
export const equal = <T>(a: T, b: T) => a === b,

  /**
   * Curried version of `equal`
   */
  $equal = <T>(a: T) => (b: T) => a === b;
