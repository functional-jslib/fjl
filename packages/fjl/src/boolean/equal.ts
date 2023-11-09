/**
 * Equality combinator.
 */
export const equal = (a: any, b: any) => a === b,

  /**
   * Curried version of `equal`
   */
  $equal = (a: any) => (b: any) => a === b;
