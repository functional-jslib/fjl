import {foldl} from "./foldl";
import {any} from "./any";
import {BinaryPred} from "../types";
import {push} from "./push";
import {take} from "./take";

/**
 * Returns an intersection by predicate.
 */
export const intersectBy = <T>(pred: BinaryPred<T>, xs1: T[], xs2: T[]): T[] =>
    foldl((agg: T[], a: T) =>
        any((b: T) => pred(a, b), xs2) ?
          push(a, agg) : agg,
      take(0, xs1),
      xs1
    ),

  /**
   * Curried version of `intersectBy`.
   */
  $intersectBy = <T>(pred: BinaryPred<T>) =>
    (xs1: T[]) =>
      (xs2: T[]): T[] => intersectBy(pred, xs1, xs2);
