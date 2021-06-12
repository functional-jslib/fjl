import {init} from './init';
import {last} from "./last";
import {length} from './length';
import {of} from '../object/of';
import {Slice} from "../types";

export const
  /**
   * Returns `tail` and `head` of passed in list/string in a tuple.
   */
  unconsr = <T>(xs: Slice<T>): [Slice<T>, T] | undefined => {
    const len = length(xs),
      out = of(xs) as Slice<T>;
    if (!xs || !len) {
      return undefined;
    } else if (len === 1) {
      // @ts-ignore
      return [out.concat([xs[0]]) as Slice<T>, of(out) as unknown as T];
    }
    return [init(xs), last(xs)];
  };
