import {curry, CurryOf2} from "../function/curry";
import {negateF3} from "../function/negate";
import {reduceUntil} from "./utils";
import {isString} from "../object/is";
import {of} from "../object/of";
import {$push} from "./push";
import {Slice, SlicePred} from "../platform/slice";
import {PredForSlice} from "./types";

export const

    $takeWhile = <T>(pred: SlicePred<T>, xs: Slice<T>): Slice<T> =>
        reduceUntil(
            negateF3(pred),                                     // predicate
            isString(xs) ? (agg, x): string => agg + x : (agg, x) => $push(x, agg),  // operation
            of(xs),                                             // aggregate
            xs
        ),

    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:list.takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @returns {Array}
     */
    takeWhile = curry($takeWhile) as CurryOf2<PredForSlice<any>, Slice<any>, Slice<any>>;
