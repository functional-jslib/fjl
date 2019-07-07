import {curry} from '../function/curry';

export const

    /**
     * Functional `apply` function (takes no context).
     * @function module:function.apply
     * @param fn {Function}
     * @param args {Array|*}
     * @returns {*}
     */
    apply = curry((fn, args) => fn.apply(null, args))
;
