export const

  /**
   * Normalizes a step for given `from` and `to` values.
   *
   * @todo Add tests.
   */
  normalizeStepOrThrow = (from: number, to: number, step: number): number => {
    if (!step) throw new Error("`step` cannot be falsy or `0`");
    if (from > to) {
      return step > 0 ? -step : step; // make step negative
    }
    return step < 0 ? -1 * step : step; // make step positive
  },

  /**
   * Curried version of `normalizeStepOrThrow`.
   *
   * @todo Add tests.
   */
  $normalizeStep = (from: number) => (to: number) => (step: number): number =>
    normalizeStepOrThrow(from, to, step)

;
