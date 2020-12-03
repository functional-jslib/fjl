/**
 * @module string
 * @description Contains functions for strings.
 */
import {intercalate, map, filter} from '../list';
import {split} from '../platform/string';
import {compose} from '../function/compose';
import {join} from '../platform/array';
import {_errorIfNotType} from '../errorThrowing';
import {SliceOf} from "../platform/slice";

export {split};

export const

  /**
   * Splits a string on all '\n', '\r', '\n\r', or '\r\n' characters.
   */
  lines = split(/[\n\r]/gm),

  /**
   * Splits a string on all '\s' and/or all '\t' characters.
   */
  words = split(/[\s\t]/gm),

  /**
   * Intersperse an array of strings with '\s' and then concats them.
   */
  unwords = intercalate(' '),

  /**
   * Intersperses a '\n' character into a list of strings and then concats it.
   */
  unlines = intercalate('\n'),

  /**
   * Lower cases first character of a non-empty string.
   * @throws {Error} - Throws error if receiving anything that is not a string.
   */
  lcaseFirst = xs => {
    _errorIfNotType(String, 'lcaseFirst', 'xs', xs);
    return xs[0].toLowerCase() + xs.substring(1);
  },

  /**
   * Upper cases first character of a non-empty string.
   * @throws {Error} - Throws error if receiving anything that is not a string.
   */
  ucaseFirst = xs => {
    _errorIfNotType(String, 'ucaseFirst', 'xs', xs);
    return xs[0].toUpperCase() + xs.substring(1);
  },

  /**
   * Camel cases (class case) a string.
   * @throws {Error} - Throws error if param `xs` is not a string.
   */
  camelCase = (xs: SliceOf<string>, pattern = /[^a-z\d]/i): string => compose<SliceOf<string>, string>(
    join(''),
    map(str => ucaseFirst(str.toLowerCase())),
    filter(x => !!x) as unknown as (xs: string[]) => string[],
    split(pattern) as (x: string) => string[]
  )(_errorIfNotType(String, 'camelCase', 'xs', xs)),

  /**
   * Class cases a string.  Uses pattern /[^a-z\d/i]/ to split on.
   * If you require a different pattern use `string.camelCase(str, pattern)`
   * and then upper case first character (`ucaseFirst`).
   * @throws {Error} - Throws error if `xs` is not a string (via `camelCase` call).
   */
  classCase = compose(ucaseFirst, camelCase)

;
