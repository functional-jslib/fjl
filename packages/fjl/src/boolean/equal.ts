/**
 * Equality combinator.
 */
export const equal = <T = any>(a: T, b: T): boolean => a === b;

export const $equal = <T = any>(a: T) => (b: T) => equal(a, b);
