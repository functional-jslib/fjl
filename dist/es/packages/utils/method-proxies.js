import { curry, curry2, curry3, curry4, curry5, curryN, } from '../function/curry';
export const 
/**
 * Creates "functional" Proxies of given method `name` on functor `f`.
 */
toCurriedOneOrMoreMethod = (name) => curry((f, ...other) => f[name](...other)), 
/**
 * Creates "functional" Proxies of given method `name` on functor `f`.
 */
toCurried2Method = (name) => curry2((a, f, ...other) => f[name](a, ...other)), 
/**
 * Creates "functional" Proxies of given method `name` on functor `f`.
 */
toCurried3Method = (name) => curry3((a, b, f, ...other) => f[name](a, b, ...other)), 
/**
 * Creates "functional" Proxies of given method `name` on functor `f`.
 */
toCurried4Method = (name) => curry4((a, b, c, f, ...other) => f[name](a, b, c, ...other)), 
/**
 * Creates "functional" Proxies of given method `name` on functor `f`.
 */
toCurried5Method = (name) => curry5((a, b, c, d, f, ...other) => f[name](a, b, c, d, ...other)), 
/**
 * Creates "functional" Proxies of given method `name` on functor `f`.
 */
toCurried6Method = (name) => curryN(6, (a, b, c, d, e, f, ...other) => f[name](a, b, c, d, e, ...other));
//# sourceMappingURL=method-proxies.js.map