import {findIndexWhereRight} from "./utils";
import {TernaryPred} from "../types";
import {negateF3} from "../function";

export const

  dropWhileEnd = <T>(pred: TernaryPred, list: T[]): T[] => {
    const splitPoint: number =
      findIndexWhereRight(negateF3(pred), list);
    if (splitPoint === -1) {
      return [];
    }
    return list.slice(0, splitPoint + 1);
  },

  $dropWhileEnd = <T>(p: TernaryPred) =>
    (list: T[]): T[] => dropWhileEnd(p, list)

;
