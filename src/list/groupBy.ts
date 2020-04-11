import {curry, CurryOf2} from "../function/curry";
import {length} from "../jsPlatform/object";
import {sliceCopy} from "./utils/sliceCopy";
import {takeWhile} from "./takeWhile";
import {$slice, SliceOf} from "../jsPlatform/slice";
import {BinaryPred} from "../types";
import {PredForSliceOf} from "./types";

export const

    $groupBy = <T>(equalityOp: PredForSliceOf<T>, xs: T[]): SliceOf<T>[] => {
        const limit = length(xs);
        if (!limit) {
            return [sliceCopy(xs)];
        }
        const predOp: PredForSliceOf<T> = (x: T): boolean => {
                if (equalityOp(x, prevItem)) {
                    ind++;
                }
                if (equalityOp(x, item)) {
                    prevItem = x;
                    return true;
                }
                return false;
            },
            agg: SliceOf<T>[] = []
        ;
        let ind = 0,
            prevItem,
            item
        ;
        for (; ind < limit; ind += 1) {
            item = xs[ind];
            agg.push(takeWhile(predOp, $slice(ind, limit, xs)) as SliceOf<T>);
        }
        return agg;
    },

    /**
     * Allows you to group items in a list based on your supplied equality check.
     * @note Sames `group` but allows you to specify equality operation.
     * @haskellType `groupBy :: (a -> a -> Bool) -> [a] -> [[a]]`
     * @function module:list.groupBy
     * @param equalityOp {Function}
     * @param xs {Array}
     * @returns {*}
     */
    groupBy = curry($groupBy) as CurryOf2<BinaryPred<any>, SliceOf<any>, SliceOf<any>[]>;
