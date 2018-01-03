'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.flip5 = exports.flip4 = exports.flip3 = exports.flip = exports.flipN = exports.until = exports.call = exports.apply = exports._flipN = exports._flip5 = exports._flip4 = exports._flip3 = exports._flip = exports._until = exports._call = exports._apply = undefined;

var _curry_ = require('./uncurried/functionOps/curry_');

Object.keys(_curry_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _curry_[key];
        }
    });
});

var _curry__ = require('./uncurried/functionOps/curry__');

Object.keys(_curry__).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _curry__[key];
        }
    });
});

var _negate_ = require('./uncurried/functionOps/negate_');

Object.keys(_negate_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _negate_[key];
        }
    });
});

var _id_ = require('./uncurried/functionOps/id_');

Object.keys(_id_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _id_[key];
        }
    });
});

var _compose_ = require('./uncurried/functionOps/compose_');

Object.keys(_compose_).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
        enumerable: true,
        get: function get() {
            return _compose_[key];
        }
    });
});

var _jsPlatform_ = require('./uncurried/jsPlatform_');

var _until_ = require('./uncurried/functionOps/until_');

var _flip_ = require('./uncurried/functionOps/flip_');

exports._apply = _jsPlatform_.apply;
exports._call = _jsPlatform_.call;
exports._until = _until_.until;
exports._flip = _flip_.flip;
exports._flip3 = _flip_.flip3;
exports._flip4 = _flip_.flip4;
exports._flip5 = _flip_.flip5;
exports._flipN = _flip_.flipN; /**
                                * Function operations: `
                                * @module functionOps
                                */

var

/**
 * Functional `apply` functionOps (takes no context).
 * @function module:functionOps.apply
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 */
apply = exports.apply = (0, _curry_.curry)(_jsPlatform_.apply),


/**
 * Functional `call` function (takes no context).
 * @function module:functionOps.call
 * @param fn {Function}
 * @param args {*}
 * @returns {*}
 */
call = exports.call = (0, _curry_.curry2)(_jsPlatform_.call),


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

        return apply(fn, (0, _jsPlatform_.reverse)(args));
    });
},


/**
 * Flips a functionOps's first and second arguments and and returns a new functionOps requiring said arguments in reverse.
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