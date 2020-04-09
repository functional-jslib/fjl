import {curry, CurryOf2} from "../function/curry";
import {reduce} from "./utils";
import {sliceCopy} from "./utils/sliceCopy";
import {includes, SliceOf} from "../jsPlatform/slice";

export type Difference<Functor> = CurryOf2<Functor, Functor, Functor>

export const

    /**
     * Returns the difference of list 1 from list 2.
     * @note The `difference` operation here is non-associative;  E.g., `a - b` is not equal to `b - a`;
     * @function module:list.difference
     * @param array1 {Array}
     * @param array2 {Array}
     * @returns {Array}
     */
    difference: Difference<SliceOf<any>> = curry((array1, array2) => { // augment this with max length and min length ordering on op
        if (array1 && !array2) {
            return sliceCopy(array1);
        }
        else if (!array1 && array2 || (!array1 && !array2)) {
            return [];
        }
        return reduce((agg, elm) =>
                !includes(elm, array2) ? (agg.push(elm), agg) : agg
            , [], array1);
    }) as Difference<SliceOf<any>>;
