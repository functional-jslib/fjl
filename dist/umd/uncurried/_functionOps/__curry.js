(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', '../_jsPlatform/_jsPlatform', '../_object/_utils'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('../_jsPlatform/_jsPlatform'), require('../_object/_utils'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._jsPlatform, global._utils);
        global.__curry = mod.exports;
    }
})(this, function (exports, _jsPlatform, _utils) {
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
     * @memberOf _functionOps
     * @author elydelacruz
     * @created 12/6/2016.
     * @description Curry implementation with place holder concept (`__`).
     * @todo Make code here more minimal (reuse small parts here).
     */

    var PlaceHolder = function PlaceHolder() {},
        notFnErrPrefix = '`fn` in `curry_(fn, ...args)`',


    /**
     * Placeholder instance.
     * @type {PlaceHolder}
     * @private
     */
    placeHolderInstance = new PlaceHolder();

    /**
     * Checks to see if value is a `PlaceHolder`.
     * @param instance {*}
     * @returns {boolean}
     * @private
     */
    function isPlaceHolder(instance) {
        return instance instanceof PlaceHolder;
    }

    /**
     * Replaces `placeholder` values in `_list`.
     * @function replacePlaceHolder
     * @private
     * @param array {Array} - Array to replace placeholders in.
     * @param args {Array} - Args from to choose from to replace placeholders.
     * @returns {Array|*} - Returns passed in `_list` with placeholders replaced by values in `args`.
     */
    function replacePlaceHolders(array, args) {
        var out = (0, _jsPlatform.map)(function (element) {
            if (!isPlaceHolder(element)) {
                return element;
            } else if ((0, _jsPlatform.length)(args)) {
                return args.shift();
            }
            return element;
        }, array);
        return (0, _jsPlatform.length)(args) ? (0, _jsPlatform.concat)(out, args) : out;
    }

    /**
     * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
     * @function module:_function.curry_
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */
    function curry_(fn) {
        for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            argsToCurry[_key - 1] = arguments[_key];
        }

        return curryN_.apply(undefined, [(0, _utils.fnOrError)(notFnErrPrefix, fn).length, fn].concat(argsToCurry));
    }

    /**
     * Curries a _function up to given arity also enforces arity via placeholder values (`__`).
     * @function module:_function.curryN_
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
     * @returns {Function} - Passed in _function wrapped in a _function for currying.
     */
    function curryN_(executeArity, fn) {
        for (var _len2 = arguments.length, curriedArgs = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            curriedArgs[_key2 - 2] = arguments[_key2];
        }

        return function () {
            for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                args[_key3] = arguments[_key3];
            }

            var concatedArgs = replacePlaceHolders(curriedArgs, args),
                placeHolders = (0, _jsPlatform.filter)(isPlaceHolder, concatedArgs),
                canBeCalled = (0, _jsPlatform.length)(concatedArgs) - (0, _jsPlatform.length)(placeHolders) >= executeArity || !executeArity;
            return !canBeCalled ? (0, _jsPlatform.apply)(curryN_, (0, _jsPlatform.concat)([executeArity, (0, _utils.fnOrError)(notFnErrPrefix, fn)], concatedArgs)) : (0, _jsPlatform.apply)((0, _utils.fnOrError)(notFnErrPrefix, fn), concatedArgs);
        };
    }

    /**
     * Place holder object (frozen) used by curry.
     * @memberOf _functionOps
     * @type {PlaceHolder}
     */
    var __ = exports.__ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,


    /**
     * Curries a _function up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call _function until 2 or more args).
     * @function module:_function.curry2_
     * @param fn {Function}
     * @returns {Function}
     */
    curry2_ = exports.curry2_ = function curry2_(fn) {
        return curryN_(2, fn);
    },


    /**
     * Curries a _function up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call _function until 3 or more args).
     * @function module:_function.curry3_
     * @param fn {Function}
     * @returns {Function}
     */
    curry3_ = exports.curry3_ = function curry3_(fn) {
        return curryN_(3, fn);
    },


    /**
     * Curries a _function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call _function until 4 or more args).
     * @function module:_function.curry4_
     * @param fn {Function}
     * @returns {Function}
     */
    curry4_ = exports.curry4_ = function curry4_(fn) {
        return curryN_(4, fn);
    },


    /**
     * Curries a _function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call _function until 5 or more args).
     * @function module:_function.curry5_
     * @param fn {Function}
     * @returns {Function}
     */
    curry5_ = exports.curry5_ = function curry5_(fn) {
        return curryN_(5, fn);
    };
});