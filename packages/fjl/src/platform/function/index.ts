import {curry2, CurryOf2} from "../../function/curry";
import {NaryOf} from "../../types";

export * from './types';

export const

  $apply = <T = any, RetT = any>(fn: NaryOf<T, RetT>, args: T[]): RetT => fn(...args),

  apply = curry2($apply as CurryOf2<NaryOf<any, any>, any, any>),

  $call = <T = any, RetT = any>(fn: NaryOf<T, RetT>, ...args: T[]): RetT => fn(...args),

  call = curry2($call) as CurryOf2<NaryOf<any, any>, any, any>

;
