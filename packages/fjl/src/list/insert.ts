import {of} from "../object/of";
import {findIndex} from "./findIndex";
import {concat} from "./concat";
import {intersperse} from "./intersperse";
import {splitAt} from "./splitAt";
import {Slice} from "../types";

/**
 * The insert function takes an element and a list and inserts the element
 * into the list at the first position where it is less than or equal to the
 * next element. In particular, if the list is sorted before the call, the
 * result will also be sorted. It is a special case of insertBy, which allows
 * the programmer to supply their own comparison function.
 */
export const insert = <T>(x: T, xs: Slice<T>): Slice<T> => {
    if (!xs.length) {
      return of(xs, x);
    }
    const foundIndex = findIndex(item => x <= item, xs);
    return foundIndex === -1 ? concat([xs, of(xs, x)]) :
      concat(intersperse(of(xs, x), splitAt(foundIndex, xs)) as Slice<T>[]);
  },

  $insert = <T>(x: T, xs: Slice<T>): Slice<T> => insert(x, xs)

;
