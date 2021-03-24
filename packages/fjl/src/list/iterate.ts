import {curry, CurryOf3} from "../function";
import {Unary} from "../types";

export const

  iterate = <T>(n: number, op: Unary<T>, x: T): T[] => {
    let ind = 0,
      lastX: T = x;
    const out: T[] = [lastX];
    for (; ind < n - 1; ind += 1) {
      lastX = op(lastX);
      out.push(lastX);
    }
    return out;
  },

  /**
   * iterate `f(x)` returns a list of repeated applications of `f` to `x` `limit` number of times.
   */
  $iterate = curry(iterate) as CurryOf3<number, Unary<any>, any, any[]>;

