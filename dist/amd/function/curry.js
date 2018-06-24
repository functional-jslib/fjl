define(['exports', './fnOrError'], function (exports, _fnOrError) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.curryN = exports.curry = exports.curryNotFnErrPrefix = undefined;

    var _fnOrError2 = _interopRequireDefault(_fnOrError);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    /**
     * @author elydelacruz
     * @created 12/6/2016.
     * @memberOf function
     * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
     */

    const

    /**
     * @private
     * @type {string}
     */
    curryNotFnErrPrefix = exports.curryNotFnErrPrefix = '`fn` in `curry(fn, ...args)`',


    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    curry = exports.curry = (fn, ...argsToCurry) => curryN((0, _fnOrError2.default)(curryNotFnErrPrefix, fn).length, fn, ...argsToCurry),


    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */
    curryN = exports.curryN = (executeArity, fn, ...curriedArgs) => {
        return (...args) => {
            let concatedArgs = curriedArgs.concat(args),
                canBeCalled = concatedArgs.length >= executeArity || !executeArity;
            return !canBeCalled ? curryN.apply(null, [executeArity, (0, _fnOrError2.default)(curryNotFnErrPrefix, fn)].concat(concatedArgs)) : (0, _fnOrError2.default)(curryNotFnErrPrefix, fn).apply(null, concatedArgs);
        };
    },


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