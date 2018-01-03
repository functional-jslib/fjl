(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './uncurried/_functionOps/curry_', './uncurried/_functionOps/curry__', './uncurried/_functionOps/negate_', './uncurried/_functionOps/id_', './uncurried/_functionOps/compose_', './uncurried/_jsPlatform', './uncurried/_functionOps/until_', './uncurried/_functionOps/flip_'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./uncurried/_functionOps/curry_'), require('./uncurried/_functionOps/curry__'), require('./uncurried/_functionOps/negate_'), require('./uncurried/_functionOps/id_'), require('./uncurried/_functionOps/compose_'), require('./uncurried/_jsPlatform'), require('./uncurried/_functionOps/until_'), require('./uncurried/_functionOps/flip_'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry_, global.curry__, global.negate_, global.id_, global.compose_, global._jsPlatform, global.until_, global.flip_);
        global.functionOps = mod.exports;
    }
})(this, function (exports, _curry_, _curry__, _negate_, _id_, _compose_, _jsPlatform, _until_, _flip_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.flip5 = exports.flip4 = exports.flip3 = exports.flip = exports.flipN = exports.until = exports.call = exports.apply = exports._flipN = exports._flip5 = exports._flip4 = exports._flip3 = exports._flip = exports._until = exports._call = exports._apply = undefined;
    Object.keys(_curry_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _curry_[key];
            }
        });
    });
    Object.keys(_curry__).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _curry__[key];
            }
        });
    });
    Object.keys(_negate_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _negate_[key];
            }
        });
    });
    Object.keys(_id_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _id_[key];
            }
        });
    });
    Object.keys(_compose_).forEach(function (key) {
        if (key === "default" || key === "__esModule") return;
        Object.defineProperty(exports, key, {
            enumerable: true,
            get: function () {
                return _compose_[key];
            }
        });
    });
    exports._apply = _jsPlatform.apply;
    exports._call = _jsPlatform.call;
    exports._until = _until_.until;
    exports._flip = _flip_.flip;
    exports._flip3 = _flip_.flip3;
    exports._flip4 = _flip_.flip4;
    exports._flip5 = _flip_.flip5;
    exports._flipN = _flip_.flipN;
    var

    /**
     * Functional `apply` _functionOps (takes no context).
     * @function module:_functionOps.apply
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    apply = exports.apply = (0, _curry_.curry)(_jsPlatform.apply),


    /**
     * Functional `call` function (takes no context).
     * @function module:functionOps.call
     * @param fn {Function}
     * @param args {*}
     * @returns {*}
     */
    call = exports.call = (0, _curry_.curry2)(_jsPlatform.call),


    /**
     * Run `operation` `until` predicate returns `true`.
     * @function module:functionOps.until
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: * - A monoidal zero or some starting point.
     * @returns {*} - What ever type `typeInstance` is
     * @curried
     */
    until = exports.until = (0, _curry_.curry)(_until_.until),


    /**
     * Flips a functions arguments order and returns a new functionOps requiring such (arguments in reverse order).
     * @function module:fnOperators.flipN
     * @param fn {Function}
     * @returns {Function}
     */
    flipN = exports.flipN = function flipN(fn) {
        return (0, _curry_.curry3)(function () {
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
        return (0, _curry_.curry)((0, _flip_.flip)(fn));
    },


    /**
     * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
     * @function module:functionOps.flip3
     * @param fn {Function} - Function<a, b, c>
     * @returns {Function} - Function<c, b, a>
     */
    flip3 = exports.flip3 = function flip3(fn) {
        return (0, _curry_.curry)((0, _flip_.flip3)(fn));
    },


    /**
     * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
     * @function module:functionOps.flip4
     * @param fn {Function} - Function<a, b, c, d>
     * @returns {Function} - Function<d, c, b, a>
     */
    flip4 = exports.flip4 = function flip4(fn) {
        return (0, _curry_.curry)((0, _flip_.flip4)(fn));
    },


    /**
     * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
     * @function module:functionOps.flip5
     * @param fn {Function} - Function<a, b, c, d, e>
     * @returns {Function} - Function<e, d, c, b, a>
     */
    flip5 = exports.flip5 = function flip5(fn) {
        return (0, _curry_.curry)((0, _flip_.flip5)(fn));
    };
});