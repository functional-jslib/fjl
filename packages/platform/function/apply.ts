import {curry2} from '../../function/curry';
import {NaryOf} from "../../types";
import {ApplyFunc} from "./types";

const

    /**
     * Functional `apply` function (takes no context).
     * @curried - Upto arity 2.
     * @deprecated
     * @function module:function.apply
     * @param fn {Function}
     * @param args {Array|*}
     * @returns {*}
     */
    apply: ApplyFunc =
        curry2((fn: NaryOf<any, unknown>, args: any[]) =>
            fn(...args)) as ApplyFunc
;

export default apply;