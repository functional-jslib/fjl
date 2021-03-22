import {length} from '../platform/object';
import {curry, CurryOf2} from '../function/curry';
import {typeOf} from '../object/typeOf';
import {of} from '../object/of';
import {isFunctor} from '../object/is';
import {isset} from '../object/isset';
import {Indexable, MapFunc} from "../types";
import {Functor} from "../data/types";

export type MapType<T1, T2, Functor1, RetFunctor> =
  CurryOf2<MapFunc<T1, number | string, Functor1, T2>, Functor1, RetFunctor>

/**
 * Maps a function onto a ListLike (string or array) or a functor (value containing a map method).
 * @function module:list.map
 * @param fn {Function} - Function to map on given value.
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
export const
  
  $map = <T, RetT>(
    fn: MapFunc<T, number | string, Functor<T> | Indexable<T>, RetT>,
    xs: Functor<T> | Indexable<T>): Functor<RetT> | Indexable<RetT> | any => {
    if (!isset(xs)) return of(xs);
    let out,
      limit,
      i = 0;
    switch (typeOf(xs)) {
      case 'Array':
        limit = length(xs as Array<T>);
        out = [];
        if (!limit) return out;
        for (; i < limit; i += 1) {
          out.push(fn(xs[i], i, xs));
        }
        return out;
      case 'String':
        limit = length(xs as unknown as string);
        out = '';
        if (!xs) return out;
        for (; i < limit; i += 1) {
          out += fn(xs[i], i, xs);
        }
        return out;
      default:
        if (isFunctor(xs)) return (xs as Functor<T>).map(fn);

        // Reduce keys and map values from original object onto an empty instance of it's type.
        return Object.keys(xs as Indexable<T>).reduce((agg, key) => {
          agg[key] = fn(xs[key], key, xs);
          return agg;
        }, of(xs) as Indexable<T>);
    }
  },

  map = curry($map) as MapType<any, any, any, any>;
