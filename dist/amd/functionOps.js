define(['exports', './uncurried/_functionOps/curry_', './uncurried/_functionOps/curry__', './uncurried/_functionOps/negate_', './uncurried/_functionOps/id_', './uncurried/_functionOps/compose_', './uncurried/_jsPlatform', './uncurried/_functionOps/until_', './uncurried/_functionOps/flip_'], function (exports, _curry_, _curry__, _negate_, _id_, _compose_, _jsPlatform, _until_, _flip_) {
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
    const

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
    flipN = exports.flipN = fn => (0, _curry_.curry3)((...args) => apply(fn, (0, _jsPlatform.reverse)(args))),


    /**
     * Flips a _functionOps's first and second arguments and and returns a new _functionOps requiring said arguments in reverse.
     * @function module:fnOperators.flip
     * @param fn {Function}
     * @returns {Function}
     */
    flip = exports.flip = fn => (0, _curry_.curry)((0, _flip_.flip)(fn)),


    /**
     * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
     * @function module:functionOps.flip3
     * @param fn {Function} - Function<a, b, c>
     * @returns {Function} - Function<c, b, a>
     */
    flip3 = exports.flip3 = fn => (0, _curry_.curry)((0, _flip_.flip3)(fn)),


    /**
     * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
     * @function module:functionOps.flip4
     * @param fn {Function} - Function<a, b, c, d>
     * @returns {Function} - Function<d, c, b, a>
     */
    flip4 = exports.flip4 = fn => (0, _curry_.curry)((0, _flip_.flip4)(fn)),


    /**
     * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
     * @function module:functionOps.flip5
     * @param fn {Function} - Function<a, b, c, d, e>
     * @returns {Function} - Function<e, d, c, b, a>
     */
    flip5 = exports.flip5 = fn => (0, _curry_.curry)((0, _flip_.flip5)(fn));
});