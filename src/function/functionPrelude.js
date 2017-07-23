/**
 * @author edlc
 * @created 5/1/17.
 * @module fnOperators
 * @type {{call: Function, apply: Function, flip: Function, flipN: Function}}
 */
export let

    /**
     * Functional `call` function (takes no context).
     * @function module:fnOperators.call
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    call = (fn, ...args) => fn.call(null, ...args),

    /**
     * Functional `apply` function (takes no context).
     * @function module:fnOperators.apply
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    apply = (fn, args) => fn.apply(null, args),

    /**
     * Flips a functions arguments order and returns a new function requiring such (arguments in reverse order).
     * @function module:fnOperators.flipN
     * @param fn {Function}
     * @returns {Function}
     */
    flipN = fn => (...args) => apply(fn, args.reverse()),

    /**
     * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
     * @function module:fnOperators.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = fn => (b, a) => call(fn, a, b),

    negate = fn => value => !fn(value);
