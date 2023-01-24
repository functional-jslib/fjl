import {isFunction} from '../object/is';
import {Nary} from "../types";

export const

    /**
     * @deprecated declare type directly.
     *
     * If given value is not a function, wraps it an 'identity'
     * function (function that returns given value untouched) else
     * returns given value. (useful in functional composition).
     */
    toFunction = <T>(x?: T): Nary => (isFunction(x) ?
      x : () => x
    ) as Nary;
