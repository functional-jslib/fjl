import {curry} from "../function/curry";
import {findIndexWhereRight, sliceTo} from "./utils";
import {of} from "../object/of";

export const
    /**
     * @function module:list.dropWhileEnd
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd = curry((pred, list) => {
        const splitPoint =
            findIndexWhereRight(
                (x, i, xs) => !pred(x, i, xs),
                list
            ) as number;
        if (splitPoint === -1) {
            return of(list);
        }
        return sliceTo(splitPoint + 1, list);
    });
