import {Slice} from "../types";

export const

  /**
   * Generator that ties a finite list into a circular one, or equivalently, the infinite repetition of the original list.
   * It is the identity on infinite lists method.
   */
  cycle = function* cycle<T = any, TS extends Slice<T> = Slice<T>>(xs: TS): Generator<TS, void> {
    let out = xs.slice(0) as TS;
    yield out;
    while (true) {
      // @ts-expect-error - Assume `#.concat` returns same type as `xs`.
      out = out.concat(xs);
      yield out;
    }
  }

