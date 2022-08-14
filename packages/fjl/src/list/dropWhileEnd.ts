import {findIndexWhereRight} from "./utils";
import {of} from "../object/of";
import {Slice, PredForSlice} from "../types";
import {sliceTo} from "./utils/sliceTo";

export const

  dropWhileEnd = <T, XS extends Slice<T>>(p: PredForSlice<T>, list: XS): XS => {
    const splitPoint =
      findIndexWhereRight(
        (x: T, i: number | string, xs: XS) => !p(x, i, xs),
        list
      ) as number;
    if (splitPoint === -1) {
      return of(list);
    }
    return sliceTo(splitPoint + 1, list);
  },

  $dropWhileEnd = <T, XS extends Slice<T>>(p: PredForSlice<T>) =>
    (list: XS): XS => dropWhileEnd(p, list)

;
