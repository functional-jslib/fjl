define(['exports', './uncurried/_function/_curry', './uncurried/_function/__curry', './uncurried/_function/_negate', './uncurried/_function/_id', './uncurried/_function/_compose', './uncurried/_jsPlatform/_jsPlatform', './uncurried/_function/_until', './uncurried/_function/_flip'], function (exports, _curry, _curry2, _negate, _id, _compose, _jsPlatform, _until2, _flip2) {
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
    const

    /**
     * Functional `apply` function (takes no context).
     * @function module:function.apply
     * @param fn {Function}
     * @param [args] {Array<*>}
     * @returns {*}
     * @curried - Triggered at 2 or more args.
     */
    apply = exports.apply = (0, _curry.curry)(_jsPlatform.apply),


    /**
     * Functional `call` function (takes no context).
     * @function module:function.call
     * @param fn {Function}
     * @param [args] {...*}
     * @returns {*}
     * @curried
     */
    call = exports.call = (0, _curry.curry2)(_jsPlatform.call),


    /**
     * Run `operation` `until` predicate returns `true`.
     * @function module:function.until
     * @param predicate {Function} :: a -> Boolean
     * @param operation {Function} :: a -> a
     * @param typeInstance {*} :: * - A monoidal zero or some starting point.
     * @returns {*} - What ever type `typeInstance` is
     * @curried
     */
    until = exports.until = (0, _curry.curry)(_until2.until),


    /**
     * Flips a functions arguments order and returns a new function requiring such (arguments in reverse order).
     * @function module:function.flipN
     * @param fn {Function}
     * @returns {Function}
     * @curried - Triggered at 3 or more (args).
     */
    flipN = exports.flipN = fn => (0, _curry.curry3)((...args) => apply(fn, (0, _jsPlatform.reverse)(args))),


    /**
     * Flips a function's first and second arguments and and returns a new function requiring said arguments in reverse.
     * @function module:function.flip
     * @param fn {Function}
     * @returns {Function}
     * @curried
     */
    flip = exports.flip = fn => (0, _curry.curry)((0, _flip2.flip)(fn)),


    /**
     * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
     * @function module:function.flip3
     * @param fn {Function} - Function<a, b, c>
     * @returns {Function} - Function<c, b, a>
     * @curried
     */
    flip3 = exports.flip3 = fn => (0, _curry.curry)((0, _flip2.flip3)(fn)),


    /**
     * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
     * @function module:function.flip4
     * @param fn {Function} - Function<a, b, c, d>
     * @returns {Function} - Function<d, c, b, a>
     * @curried
     */
    flip4 = exports.flip4 = fn => (0, _curry.curry)((0, _flip2.flip4)(fn)),


    /**
     * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
     * @function module:function.flip5
     * @param fn {Function} - Function<a, b, c, d, e>
     * @returns {Function} - Function<e, d, c, b, a>
     * @curried
     */
    flip5 = exports.flip5 = fn => (0, _curry.curry)((0, _flip2.flip5)(fn));

    /**
     * Curries a function based on it's defined arity (argument's arrayOps expected length).
     * @function module:function.curry
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     * @curried
     */

    /**
     * Curries a function up to a given arity.
     * @function module:function.curryN
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 2 (won't call function until 2 or more args).
     * @function module:function.curry2
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 3 (won't call function until 3 or more args).
     * @function module:function.curry3
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 4 (won't call function until 4 or more args).
     * @function module:function.curry4
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 5 (won't call function until 5 or more args).
     * @function module:function.curry5
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
     * @function module:function.curry_
     * @param fn {Function}
     * @param argsToCurry {...*}
     * @returns {Function}
     */

    /**
     * Curries a function up to given arity also enforces arity via placeholder values (`__`).
     * @function module:function.curryN_
     * @param executeArity {Number}
     * @param fn {Function}
     * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
     * @returns {Function} - Passed in function wrapped in a function for currying.
     */

    /**
     * Place holder object (frozen) used by curry.
     * @memberOf function
     * @type {PlaceHolder}
     */

    /**
     * Curries a function up to an arity of 2 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 2 or more args (not counting placeholder (`__`) value).
     * @function module:function.curry2_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 3 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 3 or more args (not counting placeholder (`__`) value).
     * @function module:function.curry3_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 4 or more args (not counting placeholder (`__`) value).
     * @function module:function.curry4_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Curries a function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))
     * (won't call function until 5 or more args (not counting placeholder (`__`) value).
     * @function module:function.curry5_
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes two parameters and returns a negated version of given
     * function.
     * @function module:function.negateF
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes three parameters and returns a
     * negated version of given function.
     * @function module:function.negateF3
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:function.negateF4
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Takes a function that takes four parameters and returns a
     * negated version of given function.
     * @function module:function.negateF5
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
     * @function module:function.negateP
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
     * @function module:function.negateFMany
     * @param fn {Function}
     * @returns {Function}
     */

    /**
     * Composes all functions passed in from right to left passing each functions return value to
     * the function on the left of itself.
     * @function module:function.compose
     * @param args {...Function}
     * @returns {Function}
     */
});