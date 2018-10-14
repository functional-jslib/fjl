define(['exports', '../object/typeOf', './fnOrError'], function (exports, _typeOf, _fnOrError) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.curry = exports.curryN = undefined;


    /**
     * @author elydelacruz
     * @created 12/6/2016.
     * @memberOf function
     * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
     */

    /**
         * @private
         * @type {string}
         */
    const curryNotFnErrPrefix = '`fn` in `curry(fn, ...args)`';

    const

    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curryN = exports.curryN = (executeArity, fn, ...argsToCurry) => {
        if (!fn || !(fn instanceof Function)) {
            throw new Error(`${curryNotFnErrPrefix} should be a function. ` + `Type received: ${(0, _typeOf.typeOf)(fn)};  Value received: ${fn}.`);
        }
        return (...args) => {
            let concatedArgs = argsToCurry.concat(args),
                canBeCalled = concatedArgs.length >= executeArity || !executeArity;
            return !canBeCalled ? curryN(executeArity, fn, ...concatedArgs) : fn(...concatedArgs);
        };
    },


    /**
     * Curries a function based on it's defined arity (note: rest args param (`...rest`) are not counted in arity).
     * @function module:function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = exports.curry = (fn, ...argsToCurry) => curryN((0, _fnOrError.fnOrError)(curryNotFnErrPrefix, fn).length, fn, ...argsToCurry),


    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:function.curry2
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = exports.curry2 = fn => curryN(2, fn),


    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:function.curry3
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = exports.curry3 = fn => curryN(3, fn),


    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:function.curry4
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = exports.curry4 = fn => curryN(4, fn),


    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:function.curry5
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = exports.curry5 = fn => curryN(5, fn);
});