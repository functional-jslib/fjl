import {curry, negateF3} from "../function";
import {length} from "../jsPlatform/object";
import {filter} from "./filter";

export const

    /**
     * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
     * do not match the tuple are in second list in the returned tuple.
     *  Essentially `[filter(p, xs), filter(negateF3(p), xs)]`.
     * @function module:list.partition
     * @param pred {Function} - Predicate<item, index, originalArrayOrString>
     * @param list {Array}
     * @returns {Array|String} - Tuple of arrays or strings (depends on incoming list (of type list or string)).
     */
    partition = curry((pred, list) =>
        !length(list) ?
            [[], []] :
            [filter(pred, list), filter(negateF3(pred), list)]);
