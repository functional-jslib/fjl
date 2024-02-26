import {$concat, concat} from "../_platform/slice";

export const

  /**
   * Append two, or more, lists, i.e.,
   * ```
   * expect(append(take(13, alphabetString), drop(13, alphabetString))).toEqual(alphabetString); // true
   *
   * // Another example
   * const result = append(
   *   alphabetStr.split(''),
   *   alphabetStr.split('')
   * ),
   * expected = take(2, repeat(alphabetStr));
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
