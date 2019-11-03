import {curry2} from '../../function/curry';
import {NaryOf} from "../../types";

export const

    /**
     * Functional `apply` function (takes no context).
     * @function module:function.apply
     * @param fn {Function}
     * @param args {Array|*}
     * @returns {*}
     */
    apply = curry2((fn: NaryOf<any, unknown>, args) => fn(...args))
;
