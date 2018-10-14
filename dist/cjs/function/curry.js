'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.curry = exports.curryN = undefined;

var _typeOf = require('../object/typeOf');

var _fnOrError = require('./fnOrError');

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
var curryNotFnErrPrefix = '`fn` in `curry(fn, ...args)`';

var

/**
 * Curries a function up to a given arity.
 * @function module:function.curryN
 * @param executeArity {Number}
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
curryN = exports.curryN = function curryN(executeArity, fn) {
    for (var _len = arguments.length, argsToCurry = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        argsToCurry[_key - 2] = arguments[_key];
    }

    if (!fn || !(fn instanceof Function)) {
        throw new Error(curryNotFnErrPrefix + ' should be a function. ' + ('Type received: ' + (0, _typeOf.typeOf)(fn) + ';  Value received: ' + fn + '.'));
    }
    return function () {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var concatedArgs = argsToCurry.concat(args),
            canBeCalled = concatedArgs.length >= executeArity || !executeArity;
        return !canBeCalled ? curryN.apply(undefined, [executeArity, fn].concat(_toConsumableArray(concatedArgs))) : fn.apply(undefined, _toConsumableArray(concatedArgs));
    };
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

    return curryN.apply(undefined, [(0, _fnOrError.fnOrError)(curryNotFnErrPrefix, fn).length, fn].concat(argsToCurry));
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