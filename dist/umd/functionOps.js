(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './uncurried/functionOps/curry_', './uncurried/functionOps/curry__', './uncurried/functionOps/negate_', './uncurried/functionOps/id_', './uncurried/functionOps/compose_', './uncurried/jsPlatform_', './uncurried/functionOps/until_'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./uncurried/functionOps/curry_'), require('./uncurried/functionOps/curry__'), require('./uncurried/functionOps/negate_'), require('./uncurried/functionOps/id_'), require('./uncurried/functionOps/compose_'), require('./uncurried/jsPlatform_'), require('./uncurried/functionOps/until_'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.curry_, global.curry__, global.negate_, global.id_, global.compose_, global.jsPlatform_, global.until_);
    global.functionOps = mod.exports;
  }
})(this, function (exports, _curry_, _curry__, _negate_, _id_, _compose_, _jsPlatform_, _until_) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.flip = exports.flipN = exports.until = exports.call = exports.apply = undefined;
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
});