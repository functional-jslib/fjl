import {append} from "./append";
import {nubBy} from "./nubBy";
import {removeFirstsBy} from "./removeFirstsBy";
import {BinaryPred} from "../types";
import {ListOf} from "./utils/items";

/**
 * Returns `xs1` followed by the items of `xs2` that aren't already in it, using a
 * user-supplied equality predicate, as with Haskell's `unionBy`.  Duplicates in `xs2` are
 * dropped, while any in `xs1` stay.
 */
export const unionBy = <TS extends string | any[]>(
    eq: BinaryPred<TS[number]>,
    xs1: TS,
    xs2: TS
  ): ListOf<TS> =>
    append(xs1 as any, removeFirstsBy(eq, nubBy(eq, xs2) as TS, xs1) as any) as ListOf<TS>,

  /**
   * Curried version of `unionBy`.
   */
  $unionBy = <T>(eq: BinaryPred<T>) =>
    <TS extends string | T[]>(xs1: TS) =>
      (xs2: TS): ListOf<TS> => unionBy(eq, xs1, xs2);

/**
 * `unionBy` method type.
 */
export type UnionBy = typeof unionBy;

/**
 * `$unionBy` method type
 */
export type $UnionBy = typeof $unionBy;
