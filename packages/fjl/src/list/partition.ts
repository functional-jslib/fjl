import {curry, CurryOf2} from "../function";
import {PredForSlice} from "./types";
import {Slice} from "../platform/slice";

export const

  /**
   * Partitions a list on a predicate;  Items that match predicate are in first list in tuple;  Items that
   * do not match the tuple are in second list in the returned tuple.
   *  Essentially `[filter(p, xs), filter(negateF3(p), xs)]`.
   */
  partition = curry(<T>(
    pred: PredForSlice<T>,
    list: Slice<T>
  ): [T[], T[]] => {
    if (!list) {
      return [[], []];
    }
    const listLen = list.length,
      front = [],
      back = [];
    for (let i = 0; i < listLen; i += 1) {
      const current = list[i];
      if (pred(current as T, i, list)) {
        front.push(current);
      } else {
        back.push(current);
      }
    }
    return [front, back];
  }) as CurryOf2<PredForSlice<any>, Slice<any>, [any[], any[]]>;
