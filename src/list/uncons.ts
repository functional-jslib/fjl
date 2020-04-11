import {head} from './head';
import {tail} from "./tail";

export const
    /**
     * Returns `head` and `tail` of passed in list/string in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @function module:list.uncons
     * @param xs {Array|String}
     * @returns {Array|undefined}
     */
    uncons = <T>(xs: T[]): [T, T[]] | undefined =>
        !xs || xs.length === 0 ? undefined : [head(xs), tail(xs)];
