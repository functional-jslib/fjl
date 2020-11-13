import { curry } from "../function/curry";
import { negateF3 } from "../function/negate";
import { reduceUntil } from "./utils";
import { isString } from "../object/is";
import { of } from "../object/of";
import { push } from "./push";
export const $takeWhile = (pred, xs) => reduceUntil(negateF3(pred), // predicate
isString(xs) ? (agg, x) => agg + x : push, // operation
of(xs), // aggregate
xs), 
/**
 * Gives an list with passed elements while predicate was true.
 * @function module:list.takeWhile
 * @param pred {Function} - Predicate<*, index, list|string>
 * @param list {Array|String}
 * @returns {Array}
 */
takeWhile = curry($takeWhile);
//# sourceMappingURL=takeWhile.js.map