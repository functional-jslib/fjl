import {curry, CurryOf2} from "../function/curry";
import {findIndexWhereRight, sliceTo} from "./utils";
import {of} from "../object/of";
import {SliceOf, SlicePred} from "../jsPlatform/slice";

type DropWhileEnd<T> = CurryOf2<SlicePred<T>, SliceOf<T>, SliceOf<T>>;

export const
    /**
     * @function module:list.dropWhileEnd
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @refactor
     * @returns {Array|String}
     */
    dropWhileEnd = curry(<T>(p: SlicePred<T>, list: SliceOf<T>): SliceOf<T> => {
        const splitPoint =
            findIndexWhereRight(
                (x, i, xs) => !p(x, i, xs),
                list
            ) as number;
        if (splitPoint === -1) {
            return of(list);
        }
        return sliceTo(splitPoint + 1, list) as SliceOf<T>;
    }) as DropWhileEnd<any>;
