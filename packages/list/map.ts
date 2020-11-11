import length from '../platform/object/length';
import {curry, CurryOf2} from '../function/curry';
import {typeOf} from '../object/typeOf';
import {of} from '../object/of';
import {isFunctor} from '../object/is';
import {isset} from '../object/isset';
import {Indexable, MapFunc, Mappable} from "../types";

export type MapType<T1, T2, Functor1, RetFunctor> =
    CurryOf2<MapFunc<T1, number | string, Functor1, T2>, Functor1, RetFunctor>

/**
 * Maps a function onto a ListLike (string or array) or a functor (value containing a map method).
 * @function module:list.map
 * @param fn {Function} - Function to map on given value.
 * @param xs {Array|String|*}
 * @returns {Array|String|*}
 */
export const map = curry(<T, RetT>(
    fn: MapFunc<T, number | string, Mappable<T> | Indexable<T>, RetT>,
    xs: Mappable<T> | Indexable<T>): Mappable<RetT> | Indexable<RetT> | any => {
    if (!isset(xs)) return of(xs);
    let out = of(xs),
        limit,
        i = 0;
    switch (typeOf(xs)) {
        case 'Array':
            limit = length(xs as Array<T>);
            if (!limit) return out;
            for (; i < limit; i += 1) {
                out.push(fn(xs[i], i, xs));
            }
            return out;
        case 'String':
            limit = length(xs as unknown as string);
            if (!xs) return out;
            for (; i < limit; i += 1) {
                out += fn(xs[i], i, xs);
            }
            return out;
        default:
            if (isFunctor(xs)) return (xs as Mappable<T>).map(fn);
            return Object.keys(xs).reduce((agg, key) => {
                out[key] = fn(xs[key], key, xs);
                return out;
            }, out);
    }
}) as MapType<any, any, any, any>;

export default map;
