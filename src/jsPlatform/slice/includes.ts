import {toCurried2Method} from "../../utils/fnl-method-proxies";
import {Slice, TernaryOf} from '../../types';

/**
 * Functional `includes` method (same as `(#Array|#String).includes`
 * except takes the instance functor (string/array/etc.) as the second argument.
 * @function module:list.includes
 * @param searchStr {Slice|*}
 * @param slice {Slice} - Array, string or any other `Slice` like.
 * @param [fromIndex=0] {number}
 * @returns {Boolean}
 */
const includes: (searchStr: string, slice: Slice, fromIndex?: number) => boolean = (
    (): TernaryOf<string, Slice, number, boolean> =>
        'includes' in Array.prototype ?
            toCurried2Method('includes') :
            (searchStr: string, slice: Slice, fromIndex = 0): boolean =>
                slice.indexOf(searchStr, fromIndex) > -1
)();

export default includes;