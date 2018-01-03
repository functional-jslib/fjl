(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../_jsPlatform'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../_jsPlatform'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global._jsPlatform);
    global.__curry = mod.exports;
  }
})(this, function (exports, _jsPlatform) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.curry5_ = exports.curry4_ = exports.curry3_ = exports.curry2_ = exports.__ = undefined;
  exports.curry_ = curry_;
  exports.curryN_ = curryN_;


  /**
   * PlaceHolder (__) constructor.
   * @constructor PlaceHolder
   * @private
   */
  var PlaceHolder = function PlaceHolder() {},


  /**
   * Placeholder instance.
   * @type {PlaceHolder}
   * @private
   */
  placeHolderInstance = new PlaceHolder();

  /**
   * Checks to see if value is a `PlaceHolder`.
   * @param instance {*}
   * @returns {boolean}
   * @private
   */
  /**
   * @memberOf _functionOps
   * @author elydelacruz
   * @created 12/6/2016.
   * @description Curry implementation with place holder concept (`__`).
   * @todo Make code here more minimal (reuse small parts here).
   */

  function isPlaceHolder(instance) {
    return instance instanceof PlaceHolder;
  }

  /**
   * Replaces `placeholder` values in `_listOps`.
   * @function replacePlaceHolder
   * @private
   * @param array {Array} - Array to replace placeholders in.
   * @param args {Array} - Args from to choose from to replace placeholders.
   * @returns {Array|*} - Returns passed in `_listOps` with placeholders replaced by values in `args`.
   */
  function replacePlaceHolders(array, args) {
    var out = (0, _jsPlatform.map)(function (element) {
      if (!isPlaceHolder(element)) {
        return element;
      } else if ((0, _jsPlatform.length)(args)) {
        return args.shift();
      }
      return element;
    }, array);
    return (0, _jsPlatform.length)(args) ? (0, _jsPlatform.concat)(out, args) : out;
  }

  /**
   * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
   * @function module:_functionOps.curry_
   * @param fn {Function}
   * @param argsToCurry {...*}
   * @returns {Function}
   */
  function curry_(fn) {
    for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      argsToCurry[_key - 1] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var concatedArgs = replacePlaceHolders(argsToCurry, args),
          placeHolders = (0, _jsPlatform.filter)(isPlaceHolder, concatedArgs),
          canBeCalled = (0, _jsPlatform.length)(placeHolders) === 0 && (0, _jsPlatform.length)(concatedArgs) >= (0, _jsPlatform.length)(fn);
      return canBeCalled ? (0, _jsPlatform.apply)(fn, concatedArgs) : (0, _jsPlatform.apply)(curry_, (0, _jsPlatform.concat)([fn], concatedArgs));
    };
  }

  /**
   * Curries a _functionOps up to given arity also enforces arity via placeholder values (`__`).
   * @function module:_functionOps.curryN_
   * @param executeArity {Number}
   * @param fn {Function}
   * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
   * @returns {Function} - Passed in _functionOps wrapped in a _functionOps for currying.
   */
  function curryN_(executeArity, fn) {
    for (var _len3 = arguments.length, curriedArgs = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
      curriedArgs[_key3 - 2] = arguments[_key3];
    }

    return function () {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var concatedArgs = replacePlaceHolders(curriedArgs, args),
          placeHolders = (0, _jsPlatform.filter)(isPlaceHolder, concatedArgs),
          canBeCalled = (0, _jsPlatform.length)(concatedArgs) - (0, _jsPlatform.length)(placeHolders) >= executeArity || !executeArity;
      return !canBeCalled ? (0, _jsPlatform.apply)(curryN_, (0, _jsPlatform.concat)([executeArity, fn], concatedArgs)) : (0, _jsPlatform.apply)(fn, concatedArgs);
    };
  }

  /**
   * Place holder object (frozen) used by curry.
   * @memberOf _functionOps
   * @type {PlaceHolder}
   */
  var __ = exports.__ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,


  /**
   * Curries a _functionOps up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call _functionOps until 2 or more args).
   * @function module:_functionOps.curry2_
   * @param fn {Function}
   * @returns {Function}
   */
  curry2_ = exports.curry2_ = function curry2_(fn) {
    return curryN_(2, fn);
  },


  /**
   * Curries a _functionOps up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call _functionOps until 3 or more args).
   * @function module:_functionOps.curry3_
   * @param fn {Function}
   * @returns {Function}
   */
  curry3_ = exports.curry3_ = function curry3_(fn) {
    return curryN_(3, fn);
  },


  /**
   * Curries a _functionOps up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call _functionOps until 4 or more args).
   * @function module:_functionOps.curry4_
   * @param fn {Function}
   * @returns {Function}
   */
  curry4_ = exports.curry4_ = function curry4_(fn) {
    return curryN_(4, fn);
  },


  /**
   * Curries a _functionOps up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call _functionOps until 5 or more args).
   * @function module:_functionOps.curry5_
   * @param fn {Function}
   * @returns {Function}
   */
  curry5_ = exports.curry5_ = function curry5_(fn) {
    return curryN_(5, fn);
  };
});