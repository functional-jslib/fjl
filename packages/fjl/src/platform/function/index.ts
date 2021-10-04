import {curry2, CurryOf2} from "../../function/curry";
import {Nary} from "../../types";
import {OptionalParameters} from "../../types/utility";

export const

  apply = <Fn extends Nary>(fn: Fn, args: OptionalParameters<Fn>): ReturnType<Fn> => fn(...args),

  $apply = curry2(apply) as CurryOf2<Nary, any[], any>,

  call = <Fn extends Nary>(fn: Fn, ...args: OptionalParameters<Fn>): ReturnType<Fn> => fn(...args),

  $call = curry2(call) as CurryOf2<Nary, any[], any>

;
