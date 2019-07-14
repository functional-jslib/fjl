import {curry} from "../function/curry";
import {length} from "../jsPlatform/object";
import {findIndexWhere, sliceFrom} from "./utils";
import {slice} from "../jsPlatform/list";

export const
    /**
     * Returns an list without elements that match predicate.
     * @function module:list.dropWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhile = curry((pred, list) => {
        const limit = length(list),
            splitPoint =
                findIndexWhere(
                    (x, i, xs) => !pred(x, i, xs),
                    list
                );

        return splitPoint === -1 ?
            sliceFrom(limit, list) :
            slice(splitPoint, limit, list);
    });
