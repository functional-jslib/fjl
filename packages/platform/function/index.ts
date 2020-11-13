import {ApplyFunc, CallFunc} from "./types";
import {curry2} from "../../function";
import {NaryOf} from "../../types";

export * from './types';

export const

    apply: ApplyFunc =
        curry2((fn: NaryOf<unknown, unknown>, args: unknown[]) =>
            fn(...args)) as ApplyFunc,

    call: CallFunc =
        curry2((fn: NaryOf<unknown, unknown>, ...args: unknown[]) => fn(...args)) as CallFunc


;