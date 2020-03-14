import {curry, CurryOf2} from "../function/curry";
import {length} from "../jsPlatform/object";
import {findIndexWhere, sliceFrom} from "./utils";
import {slice, SliceOf} from "../jsPlatform/slice";
import {PredForSliceOf} from "./types";

type DropWhile<T> = CurryOf2<PredForSliceOf<T>, SliceOf<T>, SliceOf<T>>;

export const

    _dropWhile = <T>(p: PredForSliceOf<T>, xs: SliceOf<T>): SliceOf<T> => {
        const limit = length(xs),
            splitPoint =
                findIndexWhere(
                    (x: T, i: number | string, xs: SliceOf<T>) => !p(x, i, xs),
                    xs
                ) as number; // @todo make curry functions return "known" type (so we don't have to cast types)
        return splitPoint === -1 ?
            sliceFrom(limit, xs) as SliceOf<T> :
            slice(splitPoint, limit, xs) as SliceOf<T>;
    },

    /**
     * Returns an list without elements that match predicate.
     * @function module:list.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = curry(_dropWhile) as DropWhile<unknown>;
