import {curry2} from '../../function/curry';
import {NaryOf} from "../../types";
import {CallFunc} from "./types";

/**
 * Functional `call` function (takes no context).
 * @deprecated
 */
const call: CallFunc =
    curry2((fn: NaryOf<unknown, unknown>, ...args: unknown[]) => fn(...args)) as CallFunc
;

export default call;
