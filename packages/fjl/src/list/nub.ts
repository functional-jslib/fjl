import {nubBy} from "./nubBy";
import {equal} from "../boolean";

/**
 * The nub function removes duplicate elements from a list.
 * In particular, it keeps only the first occurrence of each element.
 * (The name nub means `essence'.) It is a special case of nubBy, which
 * allows the programmer to supply their own equality test.
 * ```shallowCompare( nub ([1,2,3,4,3,2,1,2,4,3,5]), [1,2,3,4,5] )```
 */
export const nub = <T>(list: T[]): T[] =>
  nubBy(equal, list);
