'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flip5 = exports.flip4 = exports.flip3 = exports.flip = exports.flipN = exports.until = exports.call = exports.apply = exports._flipN = exports._flip5 = exports._flip4 = exports._flip3 = exports._flip = exports._until = exports._call = exports._apply = undefined;

var _curry = require('./uncurried/_functionOps/_curry');

Object.keys(_curry).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _curry[key];
        }
    });
});

var _curry2 = require('./uncurried/_functionOps/__curry');

Object.keys(_curry2).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _curry2[key];
        }
    });
});

var _negate = require('./uncurried/_functionOps/_negate');

Object.keys(_negate).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _negate[key];
        }
    });
});

var _id = require('./uncurried/_functionOps/_id');

Object.keys(_id).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _id[key];
        }
    });
});

var _compose = require('./uncurried/_functionOps/_compose');

Object.keys(_compose).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _compose[key];
        }
    });
});

var _jsPlatform = require('./uncurried/_jsPlatform');

var _until2 = require('./uncurried/_functionOps/_until');

var _flip2 = require('./uncurried/_functionOps/_flip');

exports._apply = _jsPlatform.apply;
exports._call = _jsPlatform.call;
exports._until = _until2.until;
exports._flip = _flip2.flip;
exports._flip3 = _flip2.flip3;
exports._flip4 = _flip2.flip4;
exports._flip5 = _flip2.flip5;
exports._flipN = _flip2.flipN; /**
                                * Function operations: `
                                * @module functionOps
                                */

var

/**
 * Functional `apply` _functionOps (takes no context).
 * @function module:_functionOps.apply
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 * @curried - Triggered at 2 or more args.
 */
apply = exports.apply = (0, _curry.curry)(_jsPlatform.apply),


/**
 * Functional `call` function (takes no context).
 * @function module:functionOps.call
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 * @curried
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
 * Flips a functions arguments order and returns a new function requiring such (arguments in reverse order).
 * @function module:fnOperators.flipN
 * @param fn {Function}
 * @returns {Function}
 * @curried - Triggered at 3 or more (args).
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
 * @curried
 */
flip = exports.flip = function flip(fn) {
    return (0, _curry.curry)((0, _flip2.flip)(fn));
},


/**
 * Returns a function that receives 3 args in reverse (3, 2, 1 etc.).
 * @function module:functionOps.flip3
 * @param fn {Function} - Function<a, b, c>
 * @returns {Function} - Function<c, b, a>
 * @curried
 */
flip3 = exports.flip3 = function flip3(fn) {
    return (0, _curry.curry)((0, _flip2.flip3)(fn));
},


/**
 * Returns a function that receives 4 args in reverse (4, 3, 2, 1 etc.).
 * @function module:functionOps.flip4
 * @param fn {Function} - Function<a, b, c, d>
 * @returns {Function} - Function<d, c, b, a>
 * @curried
 */
flip4 = exports.flip4 = function flip4(fn) {
    return (0, _curry.curry)((0, _flip2.flip4)(fn));
},


/**
 * Returns a function that receives 5 args in reverse (5, 4, 3, 2, 1 etc.).
 * @function module:functionOps.flip5
 * @param fn {Function} - Function<a, b, c, d, e>
 * @returns {Function} - Function<e, d, c, b, a>
 * @curried
 */
flip5 = exports.flip5 = function flip5(fn) {
    return (0, _curry.curry)((0, _flip2.flip5)(fn));
};

/**
 * Curries a function based on it's defined arity (argument's arrayOps expected length).
 * @function module:functionOps.curry
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 * @curried
 */

/**
 * Curries a function up to a given arity.
 * @function module:functionOps.curryN
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*}
 * @returns {Function}
 */

/**
 * Curries a function up to an arity of 2 (won't call function until 2 or more args).
 * @function module:functionOps.curry2
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Curries a function up to an arity of 3 (won't call function until 3 or more args).
 * @function module:functionOps.curry3
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Curries a function up to an arity of 4 (won't call function until 4 or more args).
 * @function module:functionOps.curry4
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Curries a function up to an arity of 5 (won't call function until 5 or more args).
 * @function module:functionOps.curry5
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Curries passed in function up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function module:functionOps.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */

/**
 * Curries a function up to given arity also enforces arity via placeholder values (`__`).
 * @function module:functionOps.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in function wrapped in a function for currying.
 */

/**
 * Place holder object (frozen) used by curry.
 * @memberOf functionOps
 * @type {PlaceHolder}
 */

/**
 * Curries a function up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call function until 2 or more args).
 * @function module:functionOps.curry2_
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Curries a function up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call function until 3 or more args).
 * @function module:functionOps.curry3_
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Curries a function up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call function until 4 or more args).
 * @function module:functionOps.curry4_
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Curries a function up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call function until 5 or more args).
 * @function module:functionOps.curry5_
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Takes a function that takes two parameters and returns a negated version of given
 * function.
 * @function module:functionOps.negateF
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Takes a function that takes three parameters and returns a
 * negated version of given function.
 * @function module:functionOps.negateF3
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Takes a function that takes four parameters and returns a
 * negated version of given function.
 * @function module:functionOps.negateF4
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Takes a function that takes four parameters and returns a
 * negated version of given function.
 * @function module:functionOps.negateF5
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Negates a javascript-'generic' predicate; `Function<element, index, list>`.
 * @function module:_functionOps.negateP
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Returns a new function which is the dual of `fn` (or the negated version of `fn`).
 * @function module:_functionOps.negateFMany
 * @param fn {Function}
 * @returns {Function}
 */

/**
 * Returns passed in parameter.
 * @haskellType `id :: a -> a`
 * @function module:functionOps.id
 * @param x {*}
 * @returns {*}
 */

/**
 * Composes all functions passed in from right to left passing each functions return value to
 * the function on the left of itself.
 * @function module:functionOps.compose
 * @param ...args {Function}
 * @returns {Function}
 */