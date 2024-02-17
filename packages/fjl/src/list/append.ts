import {$concat, concat} from "../_platform/slice";

export const

  /**
   * Append two, or more, lists, i.e.,
   * ```
   * expectEqual(append(take(13, alphabetString), drop(13, alphabetString)), alphabetString); // true
   *
   * // Another example
   * const result = append(
   *   alphabetStr.split(''),
   *   alphabetStr.split('')
   * ),
   * expected = repeat(2, alphabetStr).split('');
   *
   * shallowEquals(result, expected) === true // `true`
   * ```
   */
  append = concat,

  /**
   * Curried version of `append`.
   */
  $append = $concat

;
