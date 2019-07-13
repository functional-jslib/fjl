import {curry} from "../function/curry";

export const
    /**
     * iterate f x returns an infinite list of repeated applications of f to x.
     * @function module:list.iterate
     * @example `iterate(5, f, x) == [x, f(x), f(f(x)), ...]`
     * @param limit {Number}
     * @param op {Function} - Operation.
     * @param x {*} - Starting point.
     * @returns {*}
     */
    iterate = curry((limit, op, x) => {
        let ind = 0,
            out: any[] = [],
            lastX = x;
        for (; ind < limit; ind += 1) {
            out.push(lastX);
            lastX = op(lastX, ind);
        }
        return out;
    });

