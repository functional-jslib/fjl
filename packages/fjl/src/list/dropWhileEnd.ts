import {curry, CurryOf2} from "../function/curry";
import {findIndexWhereRight} from "./utils";
import {of} from "../object/of";
import {Slice, SlicePred} from "../types/native";
import {$sliceTo} from "./utils/sliceTo";

type DropWhileEnd<T> = CurryOf2<SlicePred<T>, Slice<T>, Slice<T>>;

export const

  dropWhileEnd = <T>(p: SlicePred<T>, list: Slice<T>): Slice<T> => {
    const splitPoint =
      findIndexWhereRight(
        (x, i, xs) => !p(x, i, xs),
        list
      ) as number;
    if (splitPoint === -1) {
      return of(list);
    }
    return $sliceTo(splitPoint + 1, list) as Slice<T>;
  },

  $dropWhileEnd = curry(dropWhileEnd) as DropWhileEnd<any>;
