import {curry2, CurryOf2} from '../../function/curry';
import {NaryOf} from "../../types";

export type CallType = CurryOf2<NaryOf<any, unknown>, any[], unknown>;

/**
 * Functional `call` function (takes no context).
 * @deprecated
 * @function module:function.call
 * @param fn {Function}
 * @param args {...*}
 * @returns {*}
 */
const call: (fn?: NaryOf<any, unknown>, ...args: any[]) => any | CallType =
    curry2((fn: NaryOf<any, unknown>, ...args) => fn(...args)) as CallType
;

export default call;
