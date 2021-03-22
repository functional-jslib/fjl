import {head} from './head';
import {tail} from "./tail";
import {Slice} from "../types";

export const
    /**
     * Returns `head` and `tail` of passed in list/string in a tuple.
     * @haskellType `uncons :: [a] -> Maybe (a, [a])`
     * @function module:list.uncons
     * @param xs {Array|String}
     * @returns {Array|undefined}
     */
    uncons = <T>(xs: Slice<T>): [T, Slice<T>] | void =>
        !xs || !xs.length ? undefined : [head(xs), tail(xs)];
