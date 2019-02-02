/**
 * @module boolean
 * @description Contains functional version of 'always-true', 'always-false', 'is-truthy', and 'is-falsy'.
 */
import {curry, curry2} from './function/curry';

export const

    /**
     * Returns whether `value` is 'truthy' or not
     * @function module:boolean.isTruthy
     * @param value
     * @returns {Boolean}
     */
    isTruthy = value => !!value,

    /**
     * Returns whether `value` is 'falsy' or not
     * @function module:boolean.isFalsy
     * @param value
     * @returns {Boolean}
     */
    isFalsy = value => !value,

    /**
     * Returns `true`.
     * @function module:boolean.alwaysTrue
     * @returns {Boolean}
     */
    alwaysTrue = () => true,

    /**
     * Returns `false`.
     * @function module:boolean.alwaysFalse
     * @returns {Boolean}
     */
    alwaysFalse = () => false,

    /**
     * Equality operator.
     * @function module:boolean.equal
     * @param a {*}
     * @param b {*}
     * @returns {boolean}
     */
    equal = curry((a, b) => a === b),

    /**
     * Equality operator for all.
     * @function module:boolean.equalAll
     * @param a {*} - Item `0`.
     * @param args {...*} - Others
     * @returns {boolean}
     */
    equalAll = curry2((a, ...args) => args.every(b => equal(a, b)))

;
