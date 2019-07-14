import {curry} from "../function/curry";
import {negateF3} from "../function/negate";
import {findIndexWhere, sliceFrom} from "./utils";
import {of} from "../object/of";
import {splitAt} from "./splitAt";

export const
    /**
     * Gives you the `span` of items matching predicate
     * and items not matching predicate;  E.g., Gives an
     * array of arrays;  E.g., [[matching-items], [non-matching-items]]
     * @function list.span
     * @param pred {Function} - ListLike predicate (`(x, i, list) => bool`)
     * @param list {Array|String}
     * @returns {(Array<Array<*>>|Array<String>)}
     * @type {Function}
     */
    span = curry((pred, list) => {
        const splitPoint = findIndexWhere(negateF3(pred), list);
        return splitPoint === -1 ?
            [sliceFrom(0, list), of(list)] :
            splitAt(splitPoint, list);
    });
