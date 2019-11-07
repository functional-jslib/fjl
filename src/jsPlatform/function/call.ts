import {curry2} from '../../function/curry';
import {NaryOf} from "../../types";
import {CallFunc} from "./types";

/**
 * Functional `call` function (takes no context).
 * @deprecated
 * @function module:function.call
 * @param fn {Function}
 * @param args {...*}
 * @returns {*}
 */
const call: CallFunc =
    curry2((fn: NaryOf<any, unknown>, ...args) => fn(...args)) as CallFunc
;

export default call;
