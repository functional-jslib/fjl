import {toCurried2Method} from "../../utils/fnl-method-proxies";
import {curry2} from "../../function";
import {IncludesFunc, Slice} from "./types";

/**
 * Functional `includes` method (same as `(#Array|#String).includes`
 * except takes the instance functor (string/array/etc.) as the second argument.
 * @function module:list.includes
 * @param searchStr {Slice|*}
 * @param slice {Slice} - Array, string or any other `Slice` like.
 * @param [fromIndex=0] {number}
 * @returns {Boolean}
 */
const includes: IncludesFunc = ((): IncludesFunc => (
        'includes' in Array.prototype ?
            toCurried2Method('includes') :
            curry2((searchStr: string, slice: Slice, fromIndex = 0): boolean =>
                slice.indexOf(searchStr, fromIndex) > -1)
    ) as IncludesFunc
)();

export default includes;
