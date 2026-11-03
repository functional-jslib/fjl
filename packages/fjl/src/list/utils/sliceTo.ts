export const

  /**
   * Slices from index `0` to given index.
   */
  sliceTo = <TS extends string | any[]>(toInd: number, xs: TS): TS =>
    xs.slice(0, toInd) as TS,

  /**
   * Curried version of `sliceTo`.
   */
  $sliceTo = (toInd: number) => <TS extends string | any[]>(xs: TS): TS =>
    sliceTo(toInd, xs)

;
