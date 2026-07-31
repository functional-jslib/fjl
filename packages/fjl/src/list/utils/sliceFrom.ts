export const

  /**
   * Returns a slice of the given list from `startInd` to the end of the list.
   */
  sliceFrom = <TS extends string | any[]>(startInd: number, xs: TS): TS => xs.slice(startInd) as TS,

  /**
   * Curried version of `sliceFrom`.
   */
  $sliceFrom = (startInd: number) =>
    <TS extends string | any[]>(xs: TS): TS =>
      sliceFrom(startInd, xs)
;
