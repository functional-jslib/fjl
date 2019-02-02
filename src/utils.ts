/**
 * @module utils
 */
import {curry, curry2} from './function/curry';

export const

    /**
     * Returns a function that takes an argument and an object on which to execute 'method name'
     * with said parameters.
     * @function module:utils.fPureTakesOne
     * @param name {String}
     * @returns {Function}
     */
    fPureTakesOne = name => curry((arg, f) => f[name](arg)),

    /**
     * Returns a function that takes 2 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @function module:utils.fPureTakes2
     * @param name {String}
     * @returns {Function}
     */
    fPureTakes2 = name => curry((arg1, arg2, f) => f[name](arg1, arg2)),

    /**
     * Returns a function that takes 3 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @function module:utils.fPureTakes3
     * @param name {String}
     * @returns {Function}
     */
    fPureTakes3 = name => curry((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3)),

    /**
     * Returns a function that takes 4 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @function module:utils.fPureTakes4
     * @param name {String}
     * @returns {Function}
     */
    fPureTakes4 = name => curry((arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4)),

    /**
     * Returns a function that takes 5 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @function module:utils.fPureTakes5
     * @param name {String}
     * @returns {Function}
     */
    fPureTakes5 = name => curry((arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5)),

    /**
     * Returns a function that takes an object and one or more arguments on which to execute 'method name'
     * with said parameters.
     * @function module:utils.fPureTakesOneOrMore
     * @param name {String}
     * @returns {Function}
     */
    fPureTakesOneOrMore = name => curry2((f, ...args) => f[name](...args))

;
