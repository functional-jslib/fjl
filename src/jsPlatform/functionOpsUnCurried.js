/**
 * Created by elydelacruz on 9/7/2017.
 */
export const

    /**
     * Functional `apply` functionOps (takes no context).
     * @function module:jsPlatform.functionOps.apply
     * @param fn {Function}
     * @param args {Array|*}
     * @returns {*}
     */
    apply = (fn, args) => fn.apply(null, args),

    /**
     * Functional `call` functionOps (takes no context).
     * @functionOps module:fnOperators.call
     * @param fn {Function}
     * @param args ...{*}
     * @returns {*}
     */
    call = (fn, ...args) => apply(fn, args);

