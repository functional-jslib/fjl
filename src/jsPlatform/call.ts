import {curry2} from '../function/curry';

/**
 * Functional `call` function (takes no context).
 * @function module:function.call
 * @param fn {Function}
 * @param args {...*}
 * @returns {*}
 */
export const call = curry2((fn, ...args) => fn.call(null, ...args));
