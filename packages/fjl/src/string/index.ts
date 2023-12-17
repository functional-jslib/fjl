/**
 * @module string
 * @description Contains functions for strings.
 */
import {$split, split} from '../platform/string';
import {range} from "../list";
import {randNatNum} from "../number";
import {id} from "../function/id";

export {split, $split};

const newLineRegex = /[\n\r]/gm,
  spaceRegex = /[ \t]/gm,
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
   * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
   */
  lines = (xs: string): string[] => xs.split(newLineRegex),

  /**
   * Splits a string on all '\s' and/or all '\t' characters.
   */
  words = (xs: string): string[] => xs.split(spaceRegex),

  /**
   * Intersperse an array of strings with '\s' and then concats them.
   */
  unwords = (xs: string[]): string => xs.join(space),

  /**
   * Intersperses a '\n' character into a list of strings and then concats it.
   */
  unlines = (xs: string[]): string => xs.join(newLine),

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
    String.fromCharCode(randNatNum(min, max)),

  /**
   * Generates a random string.
   */
  randStr = (min = 0, max = 100): string =>
    range(min, max)
      .reduce(str => str + randChar(min, max), '')

;
