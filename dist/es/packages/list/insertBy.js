import { curry } from "../function/curry";
import { length } from "../platform/object";
import { splitAt } from "./splitAt";
import { concat } from "./concat";
import { push } from "./push";
import { sliceCopy } from "./utils/sliceCopy";
import { of } from "../object/of";
import { typeOf } from "../object/typeOf";
export const $insertBy = (orderingFn, x, xs) => {
    const limit = length(xs);
    if (!limit) {
        switch (typeOf(xs)) {
            case String.name: return `${x}`;
            default: return of(xs).concat([x]);
        }
    }
    let ind = 0;
    for (; ind < limit; ind += 1) {
        if (orderingFn(x, xs[ind]) <= 0) {
            const parts = splitAt(ind, xs);
            return concat([parts[0], [x], parts[1]]);
        }
    }
    return push(sliceCopy(xs), x);
}, 
/**
 * A version of `insert` that allows you to specify the ordering of the inserted
 * item;  Before/at, or after
 * @function module:list.insertBy
 * @haskellType `insertBy :: (a -> a -> Ordering) -> a -> [a] -> [a]`
 * @note `Ordering` means 'something that is order-able'
 *  operated on by this functions logic.
 * @param orderingFn {Function} - A function that returns `-1`, `0`, or 1`.
 * @param x {*} - Value to insert.
 * @param xs {Array} - ListLike to insert into (note new list is returned)
 * @returns {Array} - New list.
 */
insertBy = curry($insertBy);
//# sourceMappingURL=insertBy.js.map