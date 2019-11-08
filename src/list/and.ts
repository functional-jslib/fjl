import {all} from "./all";
import {isTruthy} from "../boolean";
import {Indexable} from "../types";

export const
    /**
     * Conjuction of container of bools (or truthy and/or falsy values);  Returns
     * `true` if all in container are 'truthy' else returns `false`
     * @function module:list.and
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    and = <T>(xs: Indexable<T>): boolean => all(isTruthy, xs) as boolean
;
