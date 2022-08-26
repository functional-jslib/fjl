export const

  /**
   * Gets last index of a list/list-like (Array|String|Function etc.).
   */
  lastIndex = <T>(xs: T[]): number => {
    const len = xs.length;
    return len ? len - 1 : 0;
  }
;
