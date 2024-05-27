/**
 * @module list/range
 */
import {
  normalizeStepOrThrow as normalizeStep
} from "../number/normalizeStepOrThrow";

export const
  /**
   * Returns an array of numbers defined by the given range (inclusive).
   *
   * @todo Rename to `rangeArray`.
   * @todo Move (all methods here) to '../number' module.
   */
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
   *
   * @todo Rename to `range`.
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
