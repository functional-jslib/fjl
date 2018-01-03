/**
 * Created by elydelacruz on 9/7/2017.
 * @module jsPlatform_function_
 * @private
 */
export const

    /**
     * Functional `apply` function (takes no context).
     * @function module:jsPlatform_function_.apply
     * @param fn {Function}
     * @param args {Array|*}
     * @returns {*}
     */
    apply = (fn, args) => fn.apply(null, args),

    /**
     * Functional `call` function (takes no context).
     * @function module:jsPlatform_function_.call
     * @param fn {Function}
     * @param args {...*}
     * @returns {*}
     */
    call = (fn, ...args) => apply(fn, args);
