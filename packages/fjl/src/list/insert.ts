import {findIndex} from "./findIndex";
import {splitAt} from "./splitAt";

/**
 * The insert function takes an element and a list and inserts the element
 * into the list at the first position where it is less than or equal to the
 * next element. In particular, if the list is sorted before the call, the
 * result will also be sorted. It is a special case of insertBy, which allows
 * the programmer to supply their own comparison function.
 */
export const insert = <T = any, TS extends T[] = T[]>(x: T, xs: TS): any[] => {
    const {length} = xs;
    if (!length || length <= 1) return xs.concat([x]);
    const foundIndex = findIndex(item => x <= item, xs);
    if (foundIndex === -1) return xs.concat([x]);
    const [a, b] = splitAt(foundIndex, xs)
    return a.concat([x], b);
  },

  $insert = <T, TS extends T[] = T[]>(x: T) =>
    (xs: TS): any[] => insert(x, xs)

;
