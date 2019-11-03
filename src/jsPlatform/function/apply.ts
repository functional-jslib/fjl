import {curry2, CurryOf2} from '../../function/curry';
import {Nary, NaryOf} from "../../types";

export type ApplyType = CurryOf2<Nary<any>, any[], unknown>;

const

    /**
     * Functional `apply` function (takes no context).
     * @curried - Function is applied when all expected args are present
     *  else a curried function is returned.
     * @deprecated
     * @function module:function.apply
     * @param fn {Function}
     * @param args {Array|*}
     * @returns {*}
     */
    apply: (fn: NaryOf<any, unknown>, args?: any[]) => any | ApplyType =
        curry2((fn: NaryOf<any, unknown>, args: any[]) =>
            fn(...args)) as ApplyType
;

export default apply;