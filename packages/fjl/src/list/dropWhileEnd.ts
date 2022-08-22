import {findIndexWhereRight} from "./utils";
import {PredForArray} from "../types";
import {negateF3} from "../function";

export const

  dropWhileEnd = <T>(pred: PredForArray<T>, list: T[]): T[] => {
    const splitPoint: number =
      findIndexWhereRight(negateF3(pred), list);
    if (splitPoint === -1) {
      return [];
    }
    return list.slice(0, splitPoint + 1);
  },

  $dropWhileEnd = <T>(p: PredForArray<T>) =>
    (list: T[]): T[] => dropWhileEnd(p, list)

;
