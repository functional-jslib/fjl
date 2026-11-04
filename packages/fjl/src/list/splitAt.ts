export const

  /**
   * Splits slice-able in two at given position (exclusive (includes element/character at
   * given index in second part of returned list)).  A negative position is treated as `0`, so
   * `splitAt(n, xs)` is `[take(n, xs), drop(n, xs)]`, as in Haskell, rather than counting from the end.
   */
  splitAt = <TS extends string | any[]>(ind: number, sliceable: TS): [TS, TS] => {
    const start = ind < 0 ? 0 : ind;
    return [sliceable.slice(0, start) as TS, sliceable.slice(start) as TS];
  },

  $splitAt = (ind: number) =>
    <TS extends string | any[]>(sliceable: TS): [TS, TS] =>
      splitAt(ind, sliceable);
