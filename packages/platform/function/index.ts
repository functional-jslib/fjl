import {ApplyFunc, CallFunc} from "./types";
import {curry2} from "../../function/curry";
import {NaryOf} from "../../types";

export * from './types';

export const

    apply: ApplyFunc =
        curry2((fn: NaryOf<any, unknown>, args: any[]) =>
            fn(...args)) as ApplyFunc,

    call: CallFunc =
        curry2((fn: NaryOf<any, unknown>, ...args: any[]) => fn(...args)) as CallFunc


;