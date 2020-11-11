import {
    curry, Curry1,
    Curry2, curry2,
    curry3, Curry3,
    curry4, Curry4,
    curry5, Curry5,
    curryN, Curry6,
} from '../function/curry';

export const

    /**
     * Returns a function that takes an argument and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     */
    fPureTakesOne: Curry2<unknown> = (name: string) => curry2((arg, f) => f[name](arg)),

    /**
     * Returns a function that takes 2 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     */
    fPureTakes2: Curry3<unknown> = (name: string) => curry3((arg1, arg2, f) => f[name](arg1, arg2)),

    /**
     * Returns a function that takes 3 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     */
    fPureTakes3: Curry4<unknown> = (name: string) => curry4((arg1, arg2, arg3, f) => f[name](arg1, arg2, arg3)),

    /**
     * Returns a function that takes 4 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     */
    fPureTakes4: Curry5<unknown> = (name: string) =>
        curry5((arg1, arg2, arg3, arg4, f) => f[name](arg1, arg2, arg3, arg4)),

    /**
     * Returns a function that takes 5 arguments and an object on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     */
    fPureTakes5: Curry6<unknown> = (name: string) => curryN(
        6, (arg1, arg2, arg3, arg4, arg5, f) => f[name](arg1, arg2, arg3, arg4, arg5)
    ),

    /**
     * Returns a function that takes an object and one or more arguments on which to execute 'method name'
     * with said parameters.
     * @deprecated - Use one of the `toCurriedX*` methods instead.
     */
    fPureTakesOneOrMore: Curry2<unknown> = (name: string) => curry2((f, ...args) => f[name](...args)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurriedOneOrMoreMethod = (name: string): Curry1<unknown> =>
        curry((f, ...other) => f[name](...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried2Method = (name: string): Curry2<unknown> =>
        curry2((a, f, ...other) => f[name](a, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried3Method = (name: string): Curry3<unknown> =>
        curry3((a, b, f, ...other) => f[name](a, b, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried4Method = (name: string): Curry4<unknown> =>
        curry4((a, b, c, f, ...other) => f[name](a, b, c, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried5Method = (name: string): Curry5<unknown> =>
        curry5((a, b, c, d, f, ...other) => f[name](a, b, c, d, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried6Method = (name: string): Curry6<unknown> =>
        curryN(6, (a, b, c, d, e, f, ...other) => f[name](a, b, c, d, e, ...other))
;
