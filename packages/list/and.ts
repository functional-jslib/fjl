import {all} from "./all";
import {equal, isTruthy} from "../boolean";
import {Indexable} from "../types";
import {isEmpty} from "../object";

export const
    /**
     * Conjuction of container of bools (or truthy and/or falsy values);  Returns
     * `true` if all in container are 'truthy' else returns `false`
     * @function module:list.and
     * @param xs {Array|String}
     * @returns {Boolean}
     */
    and = <T>(xs: Indexable<T>): boolean => {
        if (isEmpty(xs)) {
            return false;
        }
        const ks = Object.keys(xs);
        let last: T = xs[ks.pop()],
            ksLimit = ks.length;
        while ((--ksLimit) >= 0) {
            const curr = xs[ks[ksLimit]];
            if (last !== curr) {
                return false;
            }
            last = curr;
        }
        return true;
    }
