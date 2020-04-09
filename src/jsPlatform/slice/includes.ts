import {toCurried2Method} from "../../utils/fnl-method-proxies";
import {curry2} from "../../function";
import {IncludesFunc, SliceOf} from "./types";

/**
 * Functional `includes` method (same as `(#Array|#String).includes`
 * except takes the instance functor (string/array/etc.) as the second argument.
 * @function module:list.includes
 * @param searchStr {SliceOf<any>|*}
 * @param slice {SliceOf<any>} - Array, string or any other `Slice` like.
 * @param [fromIndex=0] {number}
 * @returns {Boolean}
 */
const includes: IncludesFunc<unknown> = ((): IncludesFunc<unknown> => (
        'includes' in Array.prototype ?
            toCurried2Method('includes') :
            curry2(<T>(searchValue: T, slice: SliceOf<T>, fromIndex = 0): boolean =>
                slice.indexOf(searchValue, fromIndex) > -1)
    ) as IncludesFunc<unknown>
)();

export default includes;
