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
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurriedOneOrMoreMethod = (name: string): Curry1<any> =>
        curry((f, ...other) => f[name](...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried2Method = (name: string): Curry2<any> =>
        curry2((a, f, ...other) => f[name](a, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried3Method = (name: string): Curry3<any> =>
        curry3((a, b, f, ...other) => f[name](a, b, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried4Method = (name: string): Curry4<any> =>
        curry4((a, b, c, f, ...other) => f[name](a, b, c, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried5Method = (name: string): Curry5<any> =>
        curry5((a, b, c, d, f, ...other) => f[name](a, b, c, d, ...other)),

    /**
     * Creates "functional" Proxies of given method `name` on functor `f`.
     */
    toCurried6Method = (name: string): Curry6<any> =>
        curryN(6, (a, b, c, d, e, f, ...other) => f[name](a, b, c, d, e, ...other))
;
