import {isFunction} from '../object/is';

export const

    /**
     * If given value is not a function, wraps it an 'identity' function (function that returns given value untouched) else returns given value. (useful in
     * functional composition).
     * @function module:function.toFunction
     * @param [x=undefined] {Function|any}
     * @returns {function(): any}
     */
    toFunction = <T>(x?: T): Function => isFunction(x) ?
        x as unknown as Function: (): T => x;
