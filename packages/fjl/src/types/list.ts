import {NumberIndexable} from "./data";

/**
 * "Map + Accumulate", A.K.A. Map-Reduce, function type.
 */
export type MapAccumOp<
  AccumT = any,
  ElementT = any,
  MappedT = any,
  IndexT = number | string,
  ElementsT extends NumberIndexable<ElementT> = ElementT[]
> =
  (agg?: AccumT, x?: ElementT, i?: IndexT, xs?: ElementsT) => [AccumT, MappedT];
