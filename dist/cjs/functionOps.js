'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flip = exports.flipN = exports.until = exports.call = exports.apply = undefined;

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

/**
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
  return (0, _curry_.curry)(function (b, a) {
    return call(fn, a, b);
  });
};