import {all} from "./all";
import {isTruthy} from "../boolean";

export const
    /**
     * Conjuction of container of bools (or truthy and/or falsy values);  Returns
     * `true` if all in container are 'truthy' else returns `false`
     * @function module:list.and
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    and = xs => all(isTruthy, xs)
;
