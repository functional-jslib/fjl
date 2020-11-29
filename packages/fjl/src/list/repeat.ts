import {curry, CurryOf2} from "../function/curry";
import {iterate} from "./iterate";

type Repeat<T> = CurryOf2<number, T, T[]>;

/**
 * Repeats `x` `limit` number of times.
 * @function module:list.repeat
 * @param limit {number}
 * @param x {*}
 * @return {array}
 * @generic
 * @curried
 */
export const repeat = curry(
    <T>(n: number, x: T): T[] =>
        (n <= 0 ? [] : iterate(n, a => a, x)) as T[]
) as Repeat<any>;
