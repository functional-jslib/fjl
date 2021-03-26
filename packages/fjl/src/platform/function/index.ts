import {curry2, CurryOf2} from "../../function/curry";
import {Nary} from "../../types";

export const

  apply = <T = any, RetT = any>(fn: Nary<T, RetT>, args: T[]): RetT => fn(...args),

  $apply = curry2(apply) as CurryOf2<Nary<any, any>, any[], any>,

  call = <T = any, RetT = any>(fn: Nary<T, RetT>, ...args: T[]): RetT => fn(...args),

  $call = curry2(call) as CurryOf2<Nary<any, any>, any[], any>

;
