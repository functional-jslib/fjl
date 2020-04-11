import {curry, CurryOf2} from "../../function/curry";
import {SliceOf, SlicePred} from "../../jsPlatform/slice/types";
import length from "../../jsPlatform/object/length";

export const

    /**
     * Finds index in string or list.
     * @function module:listUtils.$findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {SliceOf<any>}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     */
    $findIndexWhere = <T>(pred: SlicePred<T>, arr: SliceOf<T>): number => {
        let ind = 0;
        const limit = length(arr);
        for (; ind < limit; ind += 1) {
            const predicateFulfilled = !!pred(arr[ind], ind, arr);
            if (predicateFulfilled) {
                return ind;
            }
        }
        return -1;
    },

    /**
     * Finds index in string or list.
     * @function module:listUtils.findIndexWhere
     * @param pred {Function} - Predicate<element, index, arr>.
     * @param arr {Array|String}
     * @returns {Number} - `-1` if predicate not matched else `index` found
     * @curried Upto two args.
     */
    findIndexWhere = curry($findIndexWhere) as CurryOf2<SlicePred<any>, SliceOf<any>, number>

;
