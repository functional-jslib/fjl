import {ApplyFunc, CallFunc} from "./types";
import {curry2, CurryOf2} from "../../function/curry";
import {NaryOf} from "../../types";

export * from './types';

export const

    apply: ApplyFunc =
        curry2(<T = any, RetT = any>(fn: NaryOf<T, RetT>, args: T[]) =>
            fn(...args)) as CurryOf2<NaryOf<any, any>, any, any>,

    call: CallFunc =
        curry2(<T = any, RetT = any>(fn: NaryOf<T, RetT>, ...args: T[]) =>
            fn(...args)) as CurryOf2<NaryOf<any, any>, any, any>

;