(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports);
        global.curry = mod.exports;
    }
})(this, function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.curry = curry;
    exports.pureCurry = pureCurry;
    exports.pureCurryN = pureCurryN;
    exports.curryN = curryN;
    /**
     * Created by elyde on 12/6/2016.
     */

    /**
     * PlaceHolder (__) constructor.
     * @constructor PlaceHolder
     * @private
     */
    var PlaceHolder = function PlaceHolder() {},


    /**
     * Placeholder instance.
     * @type {PlaceHolder}
     */
    placeHolderInstance = new PlaceHolder();

    /**
     * Checks to see if value is a `PlaceHolder`.
     * @param instance {*}
     * @returns {boolean}
     */
    function isPlaceHolder(instance) {
        return instance instanceof PlaceHolder;
    }

    /**
     * Replaces `placeholder` values in `array`.
     * @param array {Array} - Array to replace placeholders in.
     * @param args {Array} - Args from to choose from to replace placeholders.
     * @returns {Array|*} - Returns passed in `array` with placeholders replaced by values in `args`.
     */
    function replacePlaceHolders(array, args) {
        var out = array.map(function (element) {
            if (!isPlaceHolder(element)) {
                return element;
            } else if (args.length > 0) {
                return args.shift();
            }
            return element;
        });
        return args.length > 0 ? out.concat(args) : out;
    }

    /**
     * Currys passed in function along with passed in arguments passed.
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {function(...[*]=)}
     */
    function curry(fn) {
        for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            argsToCurry[_key - 1] = arguments[_key];
        }

        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var concatedArgs = replacePlaceHolders(argsToCurry, args),
                placeHolders = concatedArgs.filter(isPlaceHolder),
                canBeCalled = placeHolders.length === 0;
            return canBeCalled ? fn.apply(null, concatedArgs) : curry.apply(null, [fn].concat(concatedArgs));
        };
    }

    /**
     * Pure curry.
     * @param fn
     * @param argsToCurry
     * @returns {function(...[*]=): *}
     */
    function pureCurry(fn) {
        for (var _len3 = arguments.length, argsToCurry = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
            argsToCurry[_key3 - 1] = arguments[_key3];
        }

        return function () {
            for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                args[_key4] = arguments[_key4];
            }

            return fn.apply(null, argsToCurry.concat(args));
        };
    }

    /**
     * Curry's a function passed in `executeArity` also curries any arguments passed in from the `curriedArgs` arg and forward.
     * @param fn {Function}
     * @param executeArity {Number}
     * @param curriedArgs {...*}
     * @returns {function(...[*]=)} - Passed in function wrapped in a function for currying.
     */
    function pureCurryN(fn, executeArity) {
        for (var _len5 = arguments.length, curriedArgs = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
            curriedArgs[_key5 - 2] = arguments[_key5];
        }

        return function () {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                args[_key6] = arguments[_key6];
            }

            var concatedArgs = curriedArgs.concat(args),
                canBeCalled = concatedArgs.length >= executeArity || !executeArity;
            return !canBeCalled ? pureCurryN.apply(null, [fn, executeArity].concat(concatedArgs)) : fn.apply(null, concatedArgs);
        };
    }

    /**
     * Curry's a function passed in `executeArity` also curries any arguments passed in from the `curriedArgs` arg and forward.
     * @param fn {Function}
     * @param executeArity {Number}
     * @param curriedArgs {...*}
     * @returns {function(...[*]=)} - Passed in function wrapped in a function for currying.
     */
    function curryN(fn, executeArity) {
        for (var _len7 = arguments.length, curriedArgs = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
            curriedArgs[_key7 - 2] = arguments[_key7];
        }

        return function () {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                args[_key8] = arguments[_key8];
            }

            var concatedArgs = replacePlaceHolders(curriedArgs, args),
                placeHolders = concatedArgs.filter(isPlaceHolder),
                canBeCalled = concatedArgs.length - placeHolders.length >= executeArity || !executeArity;
            return !canBeCalled ? curryN.apply(null, [fn, executeArity].concat(concatedArgs)) : fn.apply(null, concatedArgs);
        };
    }

    /**
     * Place holder object (frozen) used by curry.
     * @type {PlaceHolder}
     */
    var __ = exports.__ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,


    /**
     * Curry's a function up to an arity of 2 (won't call function until 2 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry2 = exports.curry2 = function curry2(fn) {
        return curryN(fn, 2);
    },


    /**
     * Curry's a function up to an arity of 3 (won't call function until 3 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry3 = exports.curry3 = function curry3(fn) {
        return curryN(fn, 3);
    },


    /**
     * Curry's a function up to an arity of 4 (won't call function until 4 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry4 = exports.curry4 = function curry4(fn) {
        return curryN(fn, 4);
    },


    /**
     * Curry's a function up to an arity of 5 (won't call function until 5 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    curry5 = exports.curry5 = function curry5(fn) {
        return curryN(fn, 5);
    },


    /**
     * Curry's a function up to an arity of 2 (won't call function until 2 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    pureCurry2 = exports.pureCurry2 = function pureCurry2(fn) {
        return pureCurryN(fn, 2);
    },


    /**
     * Curry's a function up to an arity of 3 (won't call function until 3 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    pureCurry3 = exports.pureCurry3 = function pureCurry3(fn) {
        return pureCurryN(fn, 3);
    },


    /**
     * Curry's a function up to an arity of 4 (won't call function until 4 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    pureCurry4 = exports.pureCurry4 = function pureCurry4(fn) {
        return pureCurryN(fn, 4);
    },


    /**
     * Curry's a function up to an arity of 5 (won't call function until 5 or more args).
     * @param fn {Function}
     * @returns {Function}
     */
    pureCurry5 = exports.pureCurry5 = function pureCurry5(fn) {
        return pureCurryN(fn, 5);
    };

    exports.default = {
        __: __,
        curry: curry,
        curryN: curryN,
        curry2: curry2,
        curry3: curry3,
        curry4: curry4,
        curry5: curry5,
        pureCurry: pureCurry,
        pureCurryN: pureCurryN,
        pureCurry2: pureCurry2,
        pureCurry3: pureCurry3,
        pureCurry4: pureCurry4,
        pureCurry5: pureCurry5
    };
});