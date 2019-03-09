import { curry, curry2 } from '../function/curry';
/**
 * Created by elydelacruz on 9/7/2017.
 */
export const 
/**
 * Functional `apply` function (takes no context).
 * @function module:function.apply
 * @param fn {Function}
 * @param args {Array|*}
 * @returns {*}
 */
apply = curry((fn, args) => fn.apply(null, args)), 
/**
 * Functional `call` function (takes no context).
 * @function module:function.call
 * @param fn {Function}
 * @param args {...*}
 * @returns {*}
 */
call = curry2((fn, ...args) => fn.call(null, ...args));
//# sourceMappingURL=function.js.map