import {findIndexWhereRight} from "./utils";
import {of} from "../object/of";
import {Slice, PredForSlice} from "../types";
import {sliceTo} from "./utils/sliceTo";

export const

  dropWhileEnd = <T>(p: PredForSlice<T>, list: Slice<T>): Slice<T> => {
    const splitPoint =
      findIndexWhereRight(
        (x: T, i: number | string, xs: Slice<T>) => !p(x, i, xs),
        list
      ) as number;
    if (splitPoint === -1) {
      return of(list);
    }
    return sliceTo(splitPoint + 1, list) as Slice<T>;
  },

  $dropWhileEnd = <T>(p: PredForSlice<T>) =>
    (list: Slice<T>): Slice<T> => dropWhileEnd(p, list)

;
