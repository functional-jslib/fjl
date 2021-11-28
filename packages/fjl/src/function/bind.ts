import {UnitNary} from "../types";
import {curry2, CurryOf2} from "./curry";

export const bind = <F extends UnitNary>(fn: F, ...args: any[]): ReturnType<F> =>
    fn.bind(null, ...args),

  $bind = curry2(bind) as CurryOf2;
