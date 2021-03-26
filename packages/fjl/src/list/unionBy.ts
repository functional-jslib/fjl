import {curry} from "../function/curry";
import {foldl} from "./foldl";
import {any} from "./any";
import {sliceCopy} from "./utils/sliceCopy";

export const

  /**
   * Returns the union on elements matching boolean check passed in.
   */
  unionBy = (pred, arr1, arr2) =>
    foldl((agg: any[], b) => {
        const alreadyAdded = any(a => pred(a, b), agg);
        return !alreadyAdded ? (agg.push(b), agg) : agg;
      }, sliceCopy(arr1), arr2
    ),

  $unionBy = curry(unionBy);
