(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './uncurried/_functionOps/_curry', './uncurried/_functionOps/__curry', './uncurried/_functionOps/_negate', './uncurried/_functionOps/_id', './uncurried/_functionOps/_compose', './uncurried/_jsPlatform', './uncurried/_functionOps/_until', './uncurried/_functionOps/_flip'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./uncurried/_functionOps/_curry'), require('./uncurried/_functionOps/__curry'), require('./uncurried/_functionOps/_negate'), require('./uncurried/_functionOps/_id'), require('./uncurried/_functionOps/_compose'), require('./uncurried/_jsPlatform'), require('./uncurried/_functionOps/_until'), require('./uncurried/_functionOps/_flip'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global._curry, global.__curry, global._negate, global._id, global._compose, global._jsPlatform, global._until, global._flip);
        global.functionOps = mod.exports;
    }
})(this, function (exports, _curry, _curry2, _negate, _id, _compose, _jsPlatform, _until2, _flip2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.flip5 = exports.flip4 = exports.flip3 = exports.flip = exports.flipN = exports.until = exports.call = exports.apply = exports._flipN = exports._flip5 = exports._flip4 = exports._flip3 = exports._flip = exports._until = exports._call = exports._apply = undefined;
    Object.keys(_curry).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _curry[key];
            }
        });
    });
    Object.keys(_curry2).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _curry2[key];
            }
        });
    });
    Object.keys(_negate).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _negate[key];
            }
        });
    });
    Object.keys(_id).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _id[key];
            }
        });
    });
    Object.keys(_compose).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _compose[key];
            }
        });
    });
    exports._apply = _jsPlatform.apply;
    exports._call = _jsPlatform.call;
    exports._until = _until2.until;
    exports._flip = _flip2.flip;
    exports._flip3 = _flip2.flip3;
    exports._flip4 = _flip2.flip4;
    exports._flip5 = _flip2.flip5;
    exports._flipN = _flip2.flipN;
    var

    /**
     * Functional `apply` _functionOps (takes no context).
     * @function module:_functionOps.apply
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    apply = exports.apply = (0, _curry.curry)(_jsPlatform.apply),


    /**
     * Functional `call` function (takes no context).
     * @function module:functionOps.call
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    call = exports.call = (0, _curry.curry2)(_jsPlatform.call),


    /**
     * Run `operation` `until` predicate returns `true`.
     * @function module:functionOps.until
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: * - A monoidal zero or some starting point.
     * @returns {*} - What ever type `typeInstance` is
     * @curried
     */
    until = exports.until = (0, _curry.curry)(_until2.until),


    /**
     * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
     * @function module:fnOperators.flipN
     * @param fn {Function}
     * @returns {Function}
     */
    flipN = exports.flipN = function flipN(fn) {
        return (0, _curry.curry3)(function () {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            return apply(fn, (0, _jsPlatform.reverse)(args));
        });
    },


    /**
     * Flips a _functionOps's first and second arguments and and returns a new _functionOps requiring said arguments in reverse.
     * @function module:fnOperators.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = exports.flip = function flip(fn) {
        return (0, _curry.curry)((0, _flip2.flip)(fn));
    },


    /**
     * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
     * @function module:functionOps.flip3
     * @param fn {Function} - Function<a, b, c>
     * @returns {Function} - Function<c, b, a>
     */
    flip3 = exports.flip3 = function flip3(fn) {
        return (0, _curry.curry)((0, _flip2.flip3)(fn));
    },


    /**
     * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
     * @function module:functionOps.flip4
     * @param fn {Function} - Function<a, b, c, d>
     * @returns {Function} - Function<d, c, b, a>
     */
    flip4 = exports.flip4 = function flip4(fn) {
        return (0, _curry.curry)((0, _flip2.flip4)(fn));
    },


    /**
     * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
     * @function module:functionOps.flip5
     * @param fn {Function} - Function<a, b, c, d, e>
     * @returns {Function} - Function<e, d, c, b, a>
     */
    flip5 = exports.flip5 = function flip5(fn) {
        return (0, _curry.curry)((0, _flip2.flip5)(fn));
    };
});