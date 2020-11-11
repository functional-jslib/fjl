/**
 * @module utils
 */
import {
    curry, Curry1,
    Curry2,
    curry2,
    curry3,
    Curry3,
    curry4,
    Curry4,
    curry5,
    Curry5,
    Curry6, curryN
} from '../function/curry';
import {UnaryOf} from "../types";

export const

    /**
     * Returns a function that takes an argument and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     * @function module:utils.fPureTakesOne
     * @param name {String}
     * @returns {Function}
     */
    fPureTakesOne: Curry2<any> = name => curry2((arg, f) => f[name](arg)),

    /**
     * Returns a function that takes 2 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     * @function module:utils.fPureTakes2
     * @param name {String}
     * @returns {Function}
     */
    fPureTakes2: Curry3<any> = name => curry3((arg1, arg2, f) => f[name](arg1, arg2)),

    /**
     * Returns a function that takes 3 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     * @function module:utils.fPureTakes3
     * @param name {String}
     * @returns {Function}
     */
    fPureTakes3: Curry4<any> = name => curry4((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3)),

    /**
     * Returns a function that takes 4 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     * @function module:utils.fPureTakes4
     * @param name {String}
     * @returns {Function}
     */
    fPureTakes4: Curry5<any> = name =>
        curry5((arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4)),

    /**
     * Returns a function that takes 5 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     * @function module:utils.fPureTakes5
     * @param name {String}
     * @returns {Function}
     */
    fPureTakes5: Curry6<any> = name => curryN(
        6, (arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5)
    ),

    /**
     * Returns a function that takes an object and one or more arguments on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     * @function module:utils.fPureTakesOneOrMore
     * @param name {String}
     * @returns {Function}
     */
    fPureTakesOneOrMore: Curry2<any> = name => curry2((f, ...args) => f[name](...args)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     * @function module:utils.toCurried1Method
     * @param name {string} - Name of method property to proxy on `f`.
     * @returns {Curry1<any>} - Curried functional version of method of given method name on `f`.
     */
    toCurriedOneOrMoreMethod = (name: string): Curry1<any> =>
        curry((f, ...other) => f[name](...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     * @note Any values passed after `f` also get passed into proxied method.
     * @function module:utils.toCurried1Method
     * @param name {string} - Name of method property to proxy on `f`.
     * @returns {Curry2<any>} - Curried functional version of method of given method name on `f`.
     */
    toCurried2Method = (name: string): Curry2<any> =>
        curry2((a, f, ...other) => f[name](a, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     * @note Any values passed after `f` also get passed into proxied method.
     * @function module:utils.toCurried1Method
     * @param name {string} - Name of method property to proxy on `f`.
     * @returns {Curry3<any>} - Curried functional version of method of given method name on `f`.
     */
    toCurried3Method = (name: string): Curry3<any> =>
        curry3((a, b, f, ...other) => f[name](a, b, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     * @note Any values passed after `f` also get passed into proxied method.
     * @function module:utils.toCurried1Method
     * @param name {string} - Name of method property to proxy on `f`.
     * @returns {Curry4<any>} - Curried functional version of method of given method name on `f`.
     */
    toCurried4Method = (name: string): Curry4<any> =>
        curry4((a, b, c, f, ...other) => f[name](a, b, c, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     * @note Any values passed after `f` also get passed into proxied method.
     * @function module:utils.toCurried1Method
     * @param name {string} - Name of method property to proxy on `f`.
     * @returns {Curry5<any>} - Curried functional version of method of given method name on `f`.
     */
    toCurried5Method = (name: string): Curry5<any> =>
        curry5((a, b, c, d, f, ...other) => f[name](a, b, c, d, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     * @note Any values passed after `f` also get passed into proxied method.
     * @function module:utils.toCurried1Method
     * @param name {string} - Name of method property to proxy on `f`.
     * @returns {Curry6<any>} - Curried functional version of method of given method name on `f`.
     */
    toCurried6Method = (name: string): Curry6<any> =>
        curryN(6, (a, b, c, d, e, f, ...other) => f[name](a, b, c, d, e, ...other))
;
