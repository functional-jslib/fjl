import {curry, CurryOf2} from "../function/curry";
import {length} from "../platform/object";
import {findIndexWhere} from "./utils";
import {$slice, Slice} from "../platform/slice";
import {PredForSlice} from "./types";
import {$sliceFrom} from "./utils/sliceFrom";

type DropWhile<T> = CurryOf2<PredForSlice<T>, Slice<T>, Slice<T>>;

export const

    $dropWhile = <T>(p: PredForSlice<T>, xs: Slice<T>): Slice<T> => {
        const limit = length(xs),
            splitPoint =
                findIndexWhere(
                    (x: T, i: number | string, xs: Slice<T>) => !p(x, i, xs),
                    xs
                ) as number; // @todo make curry functions return "known" type (so we don't have to cast types)
        return splitPoint === -1 ?
            $sliceFrom(limit, xs) as Slice<T> :
            $slice(splitPoint, limit, xs) as Slice<T>;
    },

    /**
     * Returns an list without elements that match predicate.
     * @function module:list.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = curry($dropWhile) as DropWhile<any>;
