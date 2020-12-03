import {curry2, CurryOf2} from '../function/curry';
import {SliceOf} from "../platform/slice";

export const

  $append = <T>(...args: SliceOf<T>[]): SliceOf<T> => {
    const arg0 = args.shift() as SliceOf<T>;
    return arg0.concat(...args as SliceOf<any>);
  },

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
   * @curried
   */
  append = curry2($append) as CurryOf2<SliceOf<any>, SliceOf<any>, SliceOf<any>>
;
