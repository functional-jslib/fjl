import {curry2, CurryOf2} from '../function/curry';
import {reduce} from "./utils/reduce";
import {append} from "./append";
import {difference} from "./difference";
import {Slice} from '../platform/slice/types';

export type Complement<Functor> = CurryOf2<Functor, Functor, Functor>

export const

    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:list._complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     */
    _complement = <T>(arr0: Slice<T>, ...arrays: Slice<T>[]): Slice<T> =>
        reduce((agg, arr) => append(agg, difference(arr, arr0) as Slice<T>), [], arrays),

    /**
     * Returns the complement of list 0 and the reset of the passed in arrays.
     * @function module:list.complement
     * @param arr0 {Array}
     * @param arrays {...Array}
     * @returns {Array}
     * @curried
     */
    complement = curry2(_complement) as Complement<Slice<any>>

;
