import {curry} from "../function/curry";
import {length} from "../jsPlatform/object";
import {sliceCopy} from "./utils";
import {takeWhile} from "./takeWhile";
import {slice} from "../jsPlatform/list";

export const
    /**
     * Allows you to group items in a list based on your supplied equality check.
     * @note Sames `group` but allows you to specify equality operation.
     * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
     * @function module:list.groupBy
     * @param equalityOp {Function}
     * @param xs {Array}
     * @returns {*}
     */
    groupBy = curry((equalityOp, xs) => {
        const limit = length(xs);
        if (!limit) {
            return sliceCopy(xs);
        }
        let ind = 0,
            prevItem,
            item,
            predOp = x => {
                if (equalityOp(x, prevItem)) {
                    ind++;
                }
                if (equalityOp(x, item)) {
                    prevItem = x;
                    return true;
                }
                return false;
            },
            agg: [any[]] | any[] = [];
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(takeWhile(predOp, slice(ind, limit, xs)));
        }
        return agg;
    });
