import {curry2} from '../../function/curry';
import {NaryOf} from "../../types";

/**
 * Functional `call` function (takes no context).
 * @function module:function.call
 * @param fn {Function}
 * @param args {...*}
 * @returns {*}
 */
export const call = curry2((fn: NaryOf<any, unknown>, ...args) => fn(...args));
