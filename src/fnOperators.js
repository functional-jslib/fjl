/**
 * Created by u067265 on 5/1/17.
 */

export let

    call = (fn, x, ...args) => fn.call(x, ...args),

    apply = (fn, x, ...args) => fn.apply(x, args);

export default {
    call,
    apply
};
