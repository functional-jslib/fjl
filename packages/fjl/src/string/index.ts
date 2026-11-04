/**
 * @module string
 * @description Contains functions for strings.
 */
import {$split, split} from '../_platform/string';
import {range} from "../list";
import {randNatNum} from "../number";
import {id} from "../function/id";

export {split, $split};
export * from './charRange';

const lineBreakRegex = /\r\n|\n\r|\n|\r/,
  spaceRegex = /\s+/,
  space = ' ',
  newLine = '\n';

export enum CharCase {
  Lower,
  Upper
}

export enum FirstCharCase {
  Lower = CharCase.Lower,
  Upper = CharCase.Upper
}

export const

  /**
   * Splits a string into lines, as with Haskell's `lines`: a line break ends a line, rather than
   * separating two, so `lines('one\n')` gives `['one']`, and `lines('')` gives `[]`.
   *
   * @note Differs from Haskell's `lines`, on purpose: '\r', '\n\r', and '\r\n' also count as one
   * line break.
   */
  lines = (xs: string): string[] => {
    const parts = xs.split(lineBreakRegex);
    if (!parts[parts.length - 1]) parts.pop();
    return parts;
  },

  /**
   * Splits a string on runs of whitespace, and ignores any at the start or end, as with Haskell's
   * `words`: `words(' foo  bar ')` gives `['foo', 'bar']`.
   */
  words = (xs: string): string[] => xs.split(spaceRegex).filter(Boolean),

  /**
   * Intersperse an array of strings with '\s' and then concats them.
   */
  unwords = (xs: string[]): string => xs.join(space),

  /**
   * Appends a '\n' character to each string and then concats them, as with Haskell's `unlines`:
   * `unlines(['a', 'b'])` gives `'a\nb\n'`.
   */
  unlines = (xs: string[]): string => xs.map(x => x + newLine).join(''),

  /**
   * Lower cases first character of a non-empty string.
   * @throws {Error} - Throws error if receiving anything that is not a string.
   */
  lcaseFirst = (xs: string): string => !xs ? '' : xs[0].toLowerCase() + xs.substring(1),

  /**
   * Upper cases first character of a non-empty string.
   * @throws {Error} - Throws error if receiving anything that is not a string.
   */
  ucaseFirst = (xs: string): string => !xs ? '' : xs[0].toUpperCase() + xs.substring(1),

  /**
   * Camel cases a string.
   * @throws {TypeError} - Throws error if param `xs` is not a string.
   */
  camelCase = (xs: string, upperCaseFirst: FirstCharCase | boolean = FirstCharCase.Lower,
               pattern = /[^a-z\d]/i): string => {
    if (!xs) {
      return xs;
    }
    return (upperCaseFirst ? id : lcaseFirst)(
      xs.split(pattern)
        .map(str => ucaseFirst(str.toLowerCase()))
        .join('')
    );
  },

  /**
   * Class cases a string.  Uses pattern /[^a-z\d/i]/ to split on.
   * If you require a different pattern use `string.camelCase(str, pattern)`
   * and then upper case first character (`ucaseFirst`).
   * @throws {Error} - Throws error if `xs` is not a string (via `camelCase` call).
   */
  classCase = (xs: string): string => camelCase(xs, FirstCharCase.Upper),

  /**
   * Generates a random character.
   */
  randChar = (min = 0, max = 0x10FFFF): string =>
    String.fromCodePoint(randNatNum(min, max)),

  /**
   * Generates a random string.
   */
  randStr = (min = 0, max = 100): string =>
    range(min, max) // @todo should use a generator here.
      .reduce(str => str + randChar(min, max), '')

;
