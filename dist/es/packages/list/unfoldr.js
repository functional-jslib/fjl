import { curry } from "../function/curry";
export const 
/**
 * Unfolds a value into a list of somethings.
 * @haskellType `unfoldr :: (b -> Maybe (a, b)) -> b -> [a]`
 * @function module:list.unfoldr
 * @param op {Function} - Operation to perform (should return a two component tuple (item to aggregate and item to unfold in next iteration).
 * @param x {*} - Starting parameter to unfold from.
 * @returns {Array} - An array of whatever you return from `op` yielded.
 */
unfoldr = curry((op, x) => {
    let ind = 0, out = [], resultTuple = op(x, ind, out);
    while (resultTuple) {
        out.push(resultTuple[0]);
        resultTuple = op(resultTuple[1], ++ind, out);
    }
    return out;
});
//# sourceMappingURL=unfoldr.js.map