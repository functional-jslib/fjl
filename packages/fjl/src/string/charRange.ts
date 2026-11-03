import {numRange} from "../number/numRange";

const toCodePoint = (char: string): number => {
  if (typeof char !== 'string' || Array.from(char).length !== 1) {
    throw new Error(`Expected a single character.  Received: ${JSON.stringify(char)}`);
  }
  return char.codePointAt(0);
};

export const

  /**
   * Generator for the characters in a range (inclusive), stepping by code point.  Same semantics
   * as `numRange`:  `step` is normalized to the range's direction, and `0` is an error.
   *
   * ```javascript
   * Array.from(charRange('a', 'e'));    // ['a', 'b', 'c', 'd', 'e']
   * Array.from(charRange('a', 'e', 2)); // ['a', 'c', 'e']
   * Array.from(charRange('c', 'a'));    // ['c', 'b', 'a']
   * ```
   *
   * @throws {Error} If `start` or `end` isn't a single character, or if `step` is `0`.
   */
  charRange = function* (start: string, end: string, step = 1): Generator<string, void> {
    for (const codePoint of numRange(toCodePoint(start), toCodePoint(end), step)) {
      yield String.fromCodePoint(codePoint);
    }
  },

  /**
   * Curried version of `charRange`.
   */
  $charRange = (start: string) =>
    (end: string, step = 1): Generator<string, void> =>
      charRange(start, end, step)

;
