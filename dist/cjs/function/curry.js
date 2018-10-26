"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
var

/**
 * Returns curried function.
 * @private
 * @param executeArity {Number}
 * @param unmetArityNum {Number}
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function} - Curried function.
 */
returnCurried = function returnCurried(executeArity, unmetArityNum, fn, argsToCurry) {
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
            return function () {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                return executeAsCurriedFunc(fn, executeArity, unmetArityNum, args, argsToCurry);
            };
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
executeAsCurriedFunc = function executeAsCurriedFunc(fn, executeArity, unmetArity, args, argsToCurry) {
    var concatedArgs = argsToCurry.concat(args),
        canBeCalled = concatedArgs.length >= executeArity || !executeArity,
        newExpectedArity = executeArity - concatedArgs.length;
    return !canBeCalled ? returnCurried(executeArity, newExpectedArity, fn, concatedArgs) : fn.apply(undefined, _toConsumableArray(concatedArgs));
};

var

/**
 * Curries a function up to a given arity.
 * @function module:function.curryN
 * @param executeArity {Number}
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 * @throws {Error} - When `fn` is not a function.
 */
curryN = exports.curryN = function curryN(executeArity, fn) {
    for (var _len2 = arguments.length, argsToCurry = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        argsToCurry[_key2 - 2] = arguments[_key2];
    }

    if (!fn || !(fn instanceof Function)) {
        throw new Error("`curry*` functions expect first parameter to be of type `Function` though received " + fn + "?");
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
curry = exports.curry = function curry(fn) {
    for (var _len3 = arguments.length, argsToCurry = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        argsToCurry[_key3 - 1] = arguments[_key3];
    }

    return curryN.apply(undefined, [(fn || {}).length, fn].concat(argsToCurry));
},


/**
 * Curries a function up to an arity of 2 (won't call function until 2 or more args).
 * @function module:function.curry2
 * @param fn {Function}
 * @returns {Function}
 */
curry2 = exports.curry2 = function curry2(fn) {
    return curryN(2, fn);
},


/**
 * Curries a function up to an arity of 3 (won't call function until 3 or more args).
 * @function module:function.curry3
 * @param fn {Function}
 * @returns {Function}
 */
curry3 = exports.curry3 = function curry3(fn) {
    return curryN(3, fn);
},


/**
 * Curries a function up to an arity of 4 (won't call function until 4 or more args).
 * @function module:function.curry4
 * @param fn {Function}
 * @returns {Function}
 */
curry4 = exports.curry4 = function curry4(fn) {
    return curryN(4, fn);
},


/**
 * Curries a function up to an arity of 5 (won't call function until 5 or more args).
 * @function module:function.curry5
 * @param fn {Function}
 * @returns {Function}
 */
curry5 = exports.curry5 = function curry5(fn) {
    return curryN(5, fn);
};