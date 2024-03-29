/**
 * @module object
 */

/**
 * Normalizes step for `from` and `to` combination.
 */
const normalizeStep = <T>(from: T, to: T, step: number): number => {
  if (from > to) {
    return step > 0 ? -step : step; // make step negative
  }
  return step < 0 ? -1 * step : step; // make step positive
};

export const

  range = (from: number, to: number, step = 1): number[] => {
    let i = from;
    const out: number[] = [];
    step = normalizeStep(from, to, step);
    if (step === 0 || from === to) {
      return [from];
    }
    for (; (to - i) * step >= 0; i += step) {
      out.push(i);
    }
    return out;
  },

  /**
   * Range iterator generator.
   */
  rangeIter = function* (from: number, to: number, step = 1) {
    let i = from;
    const _step = normalizeStep(from, to, step);
    if (_step === 0 || from === to) {
      return from;
    }
    for (; (to - i) * _step >= 0; i += _step) {
      yield i;
    }
    return i + 1;
  },

  /**
   * Returns a list of numbers representing given range.
   * @note normalizes `step` to be valid if range numbers given are invalid
   *  (forces `step` to be negative if range required is in the negative direction
   *  and forces `step` to be positive if range required is in the other direction).
   */
  $range = (from: number) =>
    (to: number, step = 1): number[] =>
      range(from, to, step)

;
