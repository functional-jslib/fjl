/**
 * Created by elydelacruz on 7/22/2017.
 */
import {curry} from './curry';

export const

    /**
     * Functional `apply` function (takes no context).
     * @function module:fnOperators.apply
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    apply = curry((fn, args) => fn.apply(null, args));
