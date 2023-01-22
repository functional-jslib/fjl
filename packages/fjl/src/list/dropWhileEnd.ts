import {findIndexWhereRight} from "./utils";
import {TernaryPred} from "../types";
import {negateF3} from "../function";

export const

  dropWhileEnd = <T>(
    pred: TernaryPred,
    xs: string | T[]
  ): typeof xs => {
    const splitPoint: number =
      findIndexWhereRight(negateF3(pred), xs);
    if (splitPoint === -1) {
      return xs.constructor();
    }
    return xs.slice(0, splitPoint + 1);
  },

  $dropWhileEnd = <T>(p: TernaryPred) =>
    (xs: string | T[]): typeof xs =>
      dropWhileEnd(p, xs)

;
