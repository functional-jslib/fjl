import {apply} from './apply';
import {curry, curry2} from './curry';

export const

    /**
     * Negates a function that takes one/no argument.
     * @function module:function.negateF
     * @param fn {Function}
     * @returns {function(*=): boolean}
     */
    negateF = fn => x => !fn(x),

    /**
     * Takes a function that takes two parameters and returns a negated version of given
     * function.
     * @function module:_negate.negateF2
     * @param fn {Function}
     * @returns {Function}
     */
    negateF2 = fn => curry((a, b) => !fn(a, b)),

    /**
     * Takes a function that takes three parameters and returns a
     * negated version of given function.
     * @function module:_negate.negateF3
     * @param fn {Function}
     * @returns {Function}
     */
    negateF3 = fn => curry((a, b, c) => !fn(a, b, c)),

    /**
     * Returns a negated version of given function.
     * Returned function is variadic and un-curried.
     * @function module:function.negateFN
     * @param fn {Function}
     * @returns {Function}
     */
    negateFN = fn => (...args) => !apply(fn, args);
