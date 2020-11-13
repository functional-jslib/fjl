import { curry } from "../function";
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
iterate = curry((n, op, x) => {
    let ind = 0, lastX = x;
    const out = [lastX];
    for (; ind < n - 1; ind += 1) {
        lastX = op(lastX);
        out.push(lastX);
    }
    return out;
});
//# sourceMappingURL=iterate.js.map