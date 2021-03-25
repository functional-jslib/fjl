/**
 * @module string
 * @description Contains functions for strings.
 */
import {$intercalate} from '../list';
import {$split, split} from '../platform/string';
import {compose} from '../function/compose';
import {UnaryOf} from "../types";

export {split, $split};

export const

  /**
   * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
   */
  lines = $split(/[\n\r]/gm) as UnaryOf<string, string[]>,

  /**
   * Splits a string on all '\s' and/or all '\t' characters.
   */
  words = $split(/[\s\t]/gm) as UnaryOf<string, string[]>,

  /**
   * Intersperse an array of strings with '\s' and then concats them.
   */
  unwords = $intercalate(' '),

  /**
   * Intersperses a '\n' character into a list of strings and then concats it.
   */
  unlines = $intercalate('\n'),

  /**
   * Lower cases first character of a non-empty string.
   * @throws {Error} - Throws error if receiving anything that is not a string.
   */
  lcaseFirst = (xs: string): string => xs[0].toLowerCase() + xs.substring(1),

  /**
   * Upper cases first character of a non-empty string.
   * @throws {Error} - Throws error if receiving anything that is not a string.
   */
  ucaseFirst = (xs: string): string => xs[0].toUpperCase() + xs.substring(1),

  /**
   * Camel cases (class case) a string.
   * @throws {Error} - Throws error if param `xs` is not a string.
   */
  camelCase = (xs: string, pattern = /[^a-z\d]/i): string => {
    if (!xs) {
      return xs;
    }
    return xs.split(pattern)
      .filter(Boolean)
      .map(str => ucaseFirst(str.toLowerCase()))
      .join('');
  },

  /**
   * Class cases a string.  Uses pattern /[^a-z\d/i]/ to split on.
   * If you require a different pattern use `string.camelCase(str, pattern)`
   * and then upper case first character (`ucaseFirst`).
   * @throws {Error} - Throws error if `xs` is not a string (via `camelCase` call).
   */
  classCase = compose(ucaseFirst, camelCase)

;
