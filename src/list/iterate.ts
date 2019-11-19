import {curry, CurryOf3} from "../function";
import {BinaryOf} from "../types";

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
    iterate = curry(<T>(n: number, op: BinaryOf<T, number, any>, x: T): T[] => {
        const out: T[] = [];
        let ind = 0,
            lastX: T = x;
        for (; ind < n; ind += 1) {
            out.push(lastX);
            lastX = op(lastX, ind);
        }
        return out;
    }) as CurryOf3<number, BinaryOf<any, number, any>, any, any[]>;

