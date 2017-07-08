/**
 * Created by edlc on 5/1/17.
 * Functionally styled `call` and `apply`.
 */

export let

    call = (fn, ...args) => fn.call(null, ...args),

    apply = (fn, args) => fn.apply(null, args),

    flipN = fn => (...args) => apply(fn, args.reverse()),

    flip = fn => (b, a) => call(fn, a, b);

export default {
    call,
    apply,
    flip,
    flipN
};
