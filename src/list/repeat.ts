import {curry, CurryOf2} from "../function/curry";
import {iterate} from "../list/iterate";

type Repeat<T> = CurryOf2<number, T, T[]>;
/**
 * Repeats `x` `limit` number of times.
 * @function module:list.repeat
 * @param limit {Number}
 * @param x {*}
 * @return {Array}
 */
export const repeat = curry(
    <T>(n: number, x: T): T[] =>
        iterate(n, a => a, x) as T[]
) as Repeat<any>;
