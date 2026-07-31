export const

  /**
   * Returns a copy of a slice (E.g., an array and/or a string).
   */
  sliceCopy = <TS extends string | any[]>(xs: TS): TS => xs.slice(0) as TS

;
