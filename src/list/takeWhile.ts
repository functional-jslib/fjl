import {curry} from "../function/curry";
import {negateF3} from "../function/negate";
import {aggregateArray, reduceUntil} from "./utils";
import {isString} from "../object/is";
import {of} from "../object/of";

export const
    /**
     * Gives an list with passed elements while predicate was true.
     * @function module:list.takeWhile
     * @param pred {Function} - Predicate<*, index, list|string>
     * @param list {Array|String}
     * @returns {Array}
     */
    takeWhile = curry((pred, list) =>
        reduceUntil(
            negateF3(pred),     // predicate
            isString(list) ?
                (agg, x) => agg + x :
                aggregateArray, // operation
            of(list),           // aggregate
            list
        ));
