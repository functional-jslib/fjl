import {curry} from '../function/curry';

/**
 * Created by elydelacruz on 9/7/2017.
 * @module _jsPlatform_function
 * @private
 */
export const

    /**
     * Functional `apply` function (takes no context).
     * @function module:_jsPlatform_function.apply
     * @param fn {Function}
     * @param args {Array|*}
     * @returns {*}
     */
    apply = curry((fn, args) => fn.apply(null, args)),

    /**
     * Functional `call` function (takes no context).
     * @function module:_jsPlatform_function.call
     * @param fn {Function}
     * @param args {...*}
     * @returns {*}
     */
    call = (fn, ...args) => apply(fn, args);
