/**
 * Equality combinator.
 */
export const equal = (a, b) => a === b,

  /**
   * Curried version of `equal`
   */
  $equal = a => b => a === b;
