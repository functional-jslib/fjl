import {curry, CurryOf3} from "../function";
import {Unary} from "../types";

export const
    /**
     * iterate `f(x)` returns a list of repeated applications of `f` to `x` `limit` number of times.
     * @function module:list.iterate
     * @example `iterate(5, f, x) == [x, f(x), f(f(x)), ...]`
     * @param n {Number} - Limit.
     * @param op {Function} - Operation.
     * @param x {*} - Starting point.
     * @returns {*}`
     */
    iterate = curry(<T>(n: number, op: Unary<T>, x: T): T[] => {
        let ind = 0,
            lastX: T = x;
        const out: T[] = [lastX];
        for (; ind < n - 1; ind += 1) {
            lastX = op(lastX);
            out.push(lastX);
        }
        return out;
    }) as CurryOf3<number, Unary<any>, any, any[]>;
