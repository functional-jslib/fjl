(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './is', '../functionOps/curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./is'), require('../functionOps/curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.is, global.curry);
        global.booleanOps = mod.exports;
    }
})(this, function (exports, _is, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.bEqual = exports.bOtherwise = exports.bNot = exports.bOr = exports.bAnd = exports.alwaysFalse = exports.alwaysTrue = exports.isFalsy = exports.isTruthy = undefined;
    Object.defineProperty(exports, 'isTruthy', {
        enumerable: true,
        get: function () {
            return _is.isTruthy;
        }
    });
    Object.defineProperty(exports, 'isFalsy', {
        enumerable: true,
        get: function () {
            return _is.isFalsy;
        }
    });
    var alwaysTrue = exports.alwaysTrue = function alwaysTrue() {
        return true;
    },
        alwaysFalse = exports.alwaysFalse = function alwaysFalse() {
        return false;
    },


    /**
     * Returns whether both values are truthy or not.
     * @function module:booleanOps.and
     * @param a {*}
     * @param b {*}
     * @returns {Boolean}
     */
    bAnd = exports.bAnd = (0, _curry.curry2)(function (a, b) {
        return a && b;
    }),


    /**
     * Returns whether one of the two passed in values
     *  are truthy or not.
     * @function module:booleanOps.or
     * @param a {*}
     * @param b {*}
     * @returns {Boolean}
     */
    bOr = exports.bOr = (0, _curry.curry2)(function (a, b) {
        return a || b;
    }),


    /**
     * Returns whether passed in value is truthy or not.
     * @function module:booleanOps.not
     * @param x {*}
     * @returns {Boolean}
     */
    bNot = exports.bNot = function bNot(x) {
        return !x;
    },


    /**
     * Returns `true` - Makes code more readable in places.
     * @tentative
     * @function module:booleanOps.otherwise
     * @returns {Boolean} - Always true
     */
    bOtherwise = exports.bOtherwise = alwaysTrue,


    /**
     * Returns whether both values passed in are equal or not.
     * @function module:booleanOps.equal
     * @param a {*}
     * @param b {*}
     * @returns {Boolean}
     */
    bEqual = exports.bEqual = (0, _curry.curry2)(function (a, b) {
        return a === b;
    });
});