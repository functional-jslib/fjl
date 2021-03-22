import {curry2, CurryOf2} from "../../function/curry";
import {NaryOf} from "../../types";

export * from './types';

export const

  _apply = <T = any, RetT = any>(fn: NaryOf<T, RetT>, args: T[]): RetT => fn(...args),

  $apply = _apply,

  apply = curry2($apply as CurryOf2<NaryOf<any, any>, any, any>),

  _call = <T = any, RetT = any>(fn: NaryOf<T, RetT>, ...args: T[]): RetT => fn(...args),

  $call = _call,

  call = curry2($call) as CurryOf2<NaryOf<any, any>, any, any>

;
