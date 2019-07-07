/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf index.ts
 * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
 */

/**
 * @private
 * @type {index.ts}
 */
const

    /**
     * Returns curried function.
     * @private
     * @param executeArity {Number}
     * @param unmetArityNum {Number}
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function} - Curried function.
     */
    returnCurried = (executeArity: number, unmetArityNum: number, fn, argsToCurry: any[]): Function => {
        switch (unmetArityNum) {
            case 1:
                /* eslint-disable */
                return function func(x) {
                /* eslint-enable */
                    return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
                };
            case 2:
                /* eslint-disable */
                return function func(a, b) {
                /* eslint-enable */
                    return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
                };
            case 3:
                /* eslint-disable */
                return function func(a, b, c) {
                /* eslint-enable */
                    return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
                };
            case 4:
                /* eslint-disable */
                return function func(a, b, c, d) {
                /* eslint-enable */
                    return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
                };
            case 5:
                /* eslint-disable */
                return function func(a, b, c, d, e) {
                /* eslint-enable */
                    return executeAsCurriedFunc(fn, executeArity, unmetArityNum, Array.from(arguments), argsToCurry);
                };
            default:
                return (...args) => executeAsCurriedFunc(fn, executeArity, unmetArityNum, args, argsToCurry);
        }
    },

    /**
     * Returns curried function if unmetArity is not met else returns result of executing
     * final function.
     * @private
     * @param fn {Function}
     * @param executeArity {Number}
     * @param unmetArity {Number}
     * @param args {Array<*>}
     * @param argsToCurry {Array<*>}
     * @returns {Function|*} - Curried function or result of 'finally' executed function.
     */
    executeAsCurriedFunc = (fn, executeArity, unmetArity, args, argsToCurry): Function | any => {
        let concatedArgs = argsToCurry.concat(args),
            canBeCalled = (concatedArgs.length >= executeArity) || !executeArity,
            newExpectedArity = executeArity - concatedArgs.length;
        return !canBeCalled ?
            returnCurried(executeArity, newExpectedArity, fn, concatedArgs) :
            fn(...concatedArgs);
    }
;

export const

    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     * @throws {Error} - When `fn` is not a function.
     */
    curryN = (executeArity, fn, ...argsToCurry) => {
        if (!fn || !(fn instanceof Function)) {
            throw new Error(`\`curry*\` functions expect first parameter to be of type \`Function\` though received ${fn}?`);
        }
        return returnCurried(executeArity, executeArity - argsToCurry.length, fn, argsToCurry);
    },

    /**
     * Curries a function based on it's defined arity (note: rest args param (`...rest`) are not counted in arity).
     * @function module:function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = (fn, ...argsToCurry) => curryN((fn || {}).length, fn, ...argsToCurry),

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:function.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = fn => curryN(2, fn),

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = fn => curryN(3, fn),

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = fn => curryN(4, fn),

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = fn => curryN(5, fn);
