import { curry2 } from '../function/curry';
/**
 * Append two, or more, lists, i.e.,
 * @example
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
 *
 * @function module:list.append
 * @param [args] {...(Array|String|*)} - One or more lists or list likes (strings etc.).
 * @returns {(Array|String|*)} - Same type as list like passed in.
 */
export const append = curry2((...args) => {
    const arg0 = args.shift();
    // eslint-disable-next-line prefer-spread
    return arg0.concat.apply(arg0, args);
});
//# sourceMappingURL=append.js.map