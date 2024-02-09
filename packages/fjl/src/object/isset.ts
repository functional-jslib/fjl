export const

  /**
   * Returns a boolean indicating whether passed in value is nullish (`undefined`, or `null`) or not.
   */
  isNullish = (x: any): boolean => x === null || x === undefined,

  /**
   * Returns a boolean indicating whether passed in value is not nullish (`undefined`, or `null`) or vice-versa.
   */
  notNullish = (x: any): boolean => !isNullish(x),

  /**
   * @deprecated Use `notNullish` instead - better for readability.
   */
  isset = notNullish

;
