export const

  /**
   * Gets last index of a list/list-like (Array|String|Function etc.).
   */
  lastIndex = (xs): number => {
    const len = xs.length;
    return len ? len - 1 : 0;
  }
;
