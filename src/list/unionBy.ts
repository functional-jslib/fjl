import {curry} from "../function/curry";
import {foldl} from "./foldl";
import {any} from "./any";
import {sliceCopy} from "./utils/sliceCopy";

export const
    /**
     * Returns the union on elements matching boolean check passed in.
     * @function module:list.unionBy
     * @param pred {Function} - `pred :: a -> a -> Bool`
     * @param arr1 {Array}
     * @param arr2 {Array}
     * @returns {Array}
     */
    unionBy = curry((pred, arr1, arr2) =>
        foldl((agg, b) => {
                const alreadyAdded = any(a => pred(a, b), agg);
                return !alreadyAdded ? (agg.push(b), agg) : agg;
            }, sliceCopy(arr1), arr2
        ));
