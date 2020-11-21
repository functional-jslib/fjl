/**
 * @author edlc
 * @memberOf function
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */
import { noop } from './noop';
export const 
/**
 * Curries a function up to a given arity.
 * @function module:function.curryN
 * @param executeArity {Number}
 * @param fn {NaryOf<any, any>} - Any function that may take one or more `any`s and return `any`.
 * @param argsToCurry {...*}
 * @returns {CurryOfX<any, any>} - One of the `CurryXOf<T, Ret>` types.
 * @throws {Error} - When `fn` is not a function.
 */
curryN = (executeArity, fn, ...argsToCurry) => {
    if (!fn || !(fn instanceof Function)) {
        throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\`;  Received ${fn};`);
    }
    const out = (...args) => {
        const catedArgs = argsToCurry.concat(args), canBeCalled = (catedArgs.length >= executeArity) || executeArity <= 0;
        return canBeCalled ?
            fn(...catedArgs) :
            curryN(executeArity - catedArgs.length, fn, ...catedArgs);
    };
    // Set our function's `length` since it is "disguised" as a non-variadic function (since `curryN` currys up to
    // a given arity).
    return Object.defineProperty(out, 'length', {
        get() {
            return executeArity;
        }
    });
}, 
/**
 * Curries a function based on it's defined arity (note: rest args param (`...rest`) are not counted in arity).
 * @function module:function.curry
 * @param fn {NaryOf<any, any>}
 * @param argsToCurry {...*}
 * @returns {CurryOf1<any, any> | CurryOf2<any, any, any> |
 *  CurryOf3<any, any, any, any> | CurryOf4<any, any, any, any, any> |
 *  CurryOf5<any, any, any, any, any, any}
 */
curry = (fn, ...argsToCurry) => curryN((fn || noop).length, fn, ...argsToCurry), 
/**
 * Curries a function up to an arity of 2 (won't call function until 2 or more args).
 * @function module:function.curry2
 * @param fn {Function}
 * @returns {Function}
 */
curry2 = (fn) => curryN(2, fn), 
/**
 * Curries a function up to an arity of 3 (won't call function until 3 or more args).
 * @function module:function.curry3
 * @param fn {Function}
 * @returns {Function}
 */
curry3 = (fn) => curryN(3, fn), 
/**
 * Curries a function up to an arity of 4 (won't call function until 4 or more args).
 * @function module:function.curry4
 * @param fn {Function}
 * @returns {Function}
 */
curry4 = (fn) => curryN(4, fn), 
/**
 * Curries a function up to an arity of 5 (won't call function until 5 or more args).
 * @function module:function.curry5
 * @param fn {Function}
 * @returns {Function}
 */
curry5 = (fn) => curryN(5, fn);
//# sourceMappingURL=curry.js.map