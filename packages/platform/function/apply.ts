import {curry2} from '../../function/curry';
import {NaryOf} from "../../types";
import {ApplyFunc} from "./types";

const

    /**
     * Functional `apply` function (takes no context).
     * @deprecated
     */
    apply: ApplyFunc =
        curry2((fn: NaryOf<unknown, unknown>, args: unknown[]) =>
            fn(...args)) as ApplyFunc
;

export default apply;