import {normalizeStepOrThrow} from "./normalizeStepOrThrow";

/**
 * Generator for generating numbers in a number range.
 */
export function* numRange(start = 0, end = 1, step = 1) {
  step = normalizeStepOrThrow(start, end, step);
  let current = start;
  for (; (end - current) * step >= 0; current += step) {
    yield current;
  }
  return current < end ? current : undefined;
}
