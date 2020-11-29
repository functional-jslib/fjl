import {any} from "./any";
import {isTruthy} from "../boolean";

export const
    /**
     * Returns a boolean indicating whether any item in container is 'truthy' or not.
     * **Note** The haskell type for this function only takes two items, but here
     * we allow the passing of more than one item (may change later to adhere to the haskell type).
     * @function module:list.or
     * @haskellType `or :: Bool -> Bool -> Bool`
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    or = xs => any(isTruthy, xs);
