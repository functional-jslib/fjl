define(['exports', './apply', '../listOps/listOpsUncurried'], function (exports, _apply, _listOpsUncurried) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.curry5_ = exports.curry4_ = exports.curry3_ = exports.curry2_ = exports.__ = undefined;
    exports.curry_ = curry_;
    exports.curryN_ = curryN_;


    /**
     * PlaceHolder (__) constructor.
     * @constructor PlaceHolder
     * @private
     */
    /**
     * @author elydelacruz
     * @created 12/6/2016.
     * @file fjl-curry/src/curry.js
     * @module curry {{curry: Function, curryN: Function, curry2: Function, curry3: Function, curry4: Function, curry5: Function, curry_: Function, curryN_: Function, curry2_: Function, curry3_: Function, curry4_: Function, curry5_: Function}}
     * @description Different curry implementations for modern javascript currying.
     * @todo Make code here more minimal (reuse small parts here).
     */

    const PlaceHolder = function PlaceHolder() {},


    /**
     * Placeholder instance.
     * @type {PlaceHolder}
     */
    placeHolderInstance = new PlaceHolder();

    /**
     * Checks to see if value is a `PlaceHolder`.
     * @function isPlaceHolder
     * @param instance {*}
     * @returns {boolean}
     */
    function isPlaceHolder(instance) {
        return instance instanceof PlaceHolder;
    }

    /**
     * Replaces `placeholder` values in `listOps`.
     * @function replacePlaceHolder
     * @param array {Array} - Array to replace placeholders in.
     * @param args {Array} - Args from to choose from to replace placeholders.
     * @returns {Array|*} - Returns passed in `listOps` with placeholders replaced by values in `args`.
     */
    function replacePlaceHolders(array, args) {
        let out = (0, _listOpsUncurried.map)(element => {
            if (!isPlaceHolder(element)) {
                return element;
            } else if ((0, _listOpsUncurried.length)(args)) {
                return args.shift();
            }
            return element;
        }, array);
        return (0, _listOpsUncurried.length)(args) ? (0, _listOpsUncurried.append)(out, args) : out;
    }

    /**
     * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
     * @function curry_
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    function curry_(fn, ...argsToCurry) {
        return (...args) => {
            let concatedArgs = replacePlaceHolders(argsToCurry, args),
                placeHolders = (0, _listOpsUncurried.filter)(isPlaceHolder, concatedArgs),
                canBeCalled = (0, _listOpsUncurried.length)(placeHolders) === 0 && (0, _listOpsUncurried.length)(concatedArgs) >= (0, _listOpsUncurried.length)(fn);
            return canBeCalled ? (0, _apply.apply)(fn, concatedArgs) : (0, _apply.apply)(curry_, (0, _listOpsUncurried.append)([fn], concatedArgs));
        };
    }

    /**
     * Curries a functionOps up to given arity also enforces arity via placeholder values (`__`).
     * @function curryN_
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
     * @returns {Function} - Passed in functionOps wrapped in a functionOps for currying.
     */
    function curryN_(executeArity, fn, ...curriedArgs) {
        return (...args) => {
            let concatedArgs = replacePlaceHolders(curriedArgs, args),
                placeHolders = (0, _listOpsUncurried.filter)(isPlaceHolder, concatedArgs),
                canBeCalled = (0, _listOpsUncurried.length)(concatedArgs) - (0, _listOpsUncurried.length)(placeHolders) >= executeArity || !executeArity;
            return !canBeCalled ? (0, _apply.apply)(curryN_, (0, _listOpsUncurried.append)([executeArity, fn], concatedArgs)) : (0, _apply.apply)(fn, concatedArgs);
        };
    }

    /**
     * Place holder object (frozen) used by curry.
     * @type {PlaceHolder}
     */
    let __ = exports.__ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,


    /**
     * Curries a functionOps up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 2 or more args).
     * @function curry2_
     * @param fn {Function}
     * @returns {Function}
     */
    curry2_ = exports.curry2_ = fn => curryN_(2, fn),


    /**
     * Curries a functionOps up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 3 or more args).
     * @function curry3_
     * @param fn {Function}
     * @returns {Function}
     */
    curry3_ = exports.curry3_ = fn => curryN_(3, fn),


    /**
     * Curries a functionOps up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 4 or more args).
     * @function curry4_
     * @param fn {Function}
     * @returns {Function}
     */
    curry4_ = exports.curry4_ = fn => curryN_(4, fn),


    /**
     * Curries a functionOps up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 5 or more args).
     * @function curry5_
     * @param fn {Function}
     * @returns {Function}
     */
    curry5_ = exports.curry5_ = fn => curryN_(5, fn);
});