'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.curryN = exports.curry = undefined;

var _jsPlatform = require('../_jsPlatform');

var

/**
 * Curries a functionOps based on it's defined arity (argument's arrayOps expected length).
 * @function module:_functionOps.curry
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
curry = exports.curry = function curry(fn) {
  for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argsToCurry[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var concatedArgs = (0, _jsPlatform.concat)(argsToCurry, args);
    return (0, _jsPlatform.length)(concatedArgs) < (0, _jsPlatform.length)(fn) ? (0, _jsPlatform.apply)(curry, (0, _jsPlatform.concat)([fn], concatedArgs)) : (0, _jsPlatform.apply)(fn, concatedArgs);
  };
},


/**
 * Curries a functionOps up to a given arity.
 * @function module:_functionOps.curryN
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*}
 * @returns {Function}
 */
curryN = exports.curryN = function curryN(executeArity, fn) {
  for (var _len3 = arguments.length, curriedArgs = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
    curriedArgs[_key3 - 2] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var concatedArgs = (0, _jsPlatform.concat)(curriedArgs, args),
        canBeCalled = (0, _jsPlatform.length)(concatedArgs) >= executeArity || !executeArity;
    return !canBeCalled ? (0, _jsPlatform.apply)(curryN, (0, _jsPlatform.concat)([executeArity, fn], concatedArgs)) : (0, _jsPlatform.apply)(fn, concatedArgs);
  };
},


/**
 * Curries a _functionOps up to an arity of 2 (won't call _functionOps until 2 or more args).
 * @function module:_functionOps.curry2
 * @param fn {Function}
 * @returns {Function}
 */
curry2 = exports.curry2 = function curry2(fn) {
  return curryN(2, fn);
},


/**
 * Curries a _functionOps up to an arity of 3 (won't call _functionOps until 3 or more args).
 * @function module:_functionOps.curry3
 * @param fn {Function}
 * @returns {Function}
 */
curry3 = exports.curry3 = function curry3(fn) {
  return curryN(3, fn);
},


/**
 * Curries a _functionOps up to an arity of 4 (won't call _functionOps until 4 or more args).
 * @function module:_functionOps.curry4
 * @param fn {Function}
 * @returns {Function}
 */
curry4 = exports.curry4 = function curry4(fn) {
  return curryN(4, fn);
},


/**
 * Curries a _functionOps up to an arity of 5 (won't call _functionOps until 5 or more args).
 * @function module:_functionOps.curry5
 * @param fn {Function}
 * @returns {Function}
 */
curry5 = exports.curry5 = function curry5(fn) {
  return curryN(5, fn);
}; /**
    * @author elydelacruz
    * @created 12/6/2016.
    * @memberOf _functionOps
    * @description "Curry strict" and "curry arbitrarily" functions (`curry`, `curryN`).
    */