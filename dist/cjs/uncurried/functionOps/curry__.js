'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curry5_ = exports.curry4_ = exports.curry3_ = exports.curry2_ = exports.__ = undefined;
exports.curry_ = curry_;
exports.curryN_ = curryN_;

var _apply_ = require('./apply_');

var _listOps_ = require('../listOps_');

/**
 * PlaceHolder (__) constructor.
 * @constructor PlaceHolder
 * @private
 */
/**
 * @memberOf functionOps
 * @author elydelacruz
 * @created 12/6/2016.
 * @description Curry implementation with place holder concept (`__`).
 * @todo Make code here more minimal (reuse small parts here).
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
function isPlaceHolder(instance) {
  return instance instanceof PlaceHolder;
}

/**
 * Replaces `placeholder` values in `listOps`.
 * @function replacePlaceHolder
 * @private
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `listOps` with placeholders replaced by values in `args`.
 */
function replacePlaceHolders(array, args) {
  var out = (0, _listOps_.map)(function (element) {
    if (!isPlaceHolder(element)) {
      return element;
    } else if ((0, _listOps_.length)(args)) {
      return args.shift();
    }
    return element;
  }, array);
  return (0, _listOps_.length)(args) ? (0, _listOps_.append)(out, args) : out;
}

/**
 * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function module:functionOps_.curry_
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
        placeHolders = (0, _listOps_.filter)(isPlaceHolder, concatedArgs),
        canBeCalled = (0, _listOps_.length)(placeHolders) === 0 && (0, _listOps_.length)(concatedArgs) >= (0, _listOps_.length)(fn);
    return canBeCalled ? (0, _apply_.apply)(fn, concatedArgs) : (0, _apply_.apply)(curry_, (0, _listOps_.append)([fn], concatedArgs));
  };
}

/**
 * Curries a functionOps up to given arity also enforces arity via placeholder values (`__`).
 * @function module:functionOps_.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in functionOps wrapped in a functionOps for currying.
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
        placeHolders = (0, _listOps_.filter)(isPlaceHolder, concatedArgs),
        canBeCalled = (0, _listOps_.length)(concatedArgs) - (0, _listOps_.length)(placeHolders) >= executeArity || !executeArity;
    return !canBeCalled ? (0, _apply_.apply)(curryN_, (0, _listOps_.append)([executeArity, fn], concatedArgs)) : (0, _apply_.apply)(fn, concatedArgs);
  };
}

/**
 * Place holder object (frozen) used by curry.
 * @memberOf functionOps_
 * @type {PlaceHolder}
 */
var __ = exports.__ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,


/**
 * Curries a functionOps up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 2 or more args).
 * @function module:functionOps_.curry2_
 * @param fn {Function}
 * @returns {Function}
 */
curry2_ = exports.curry2_ = function curry2_(fn) {
  return curryN_(2, fn);
},


/**
 * Curries a functionOps up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 3 or more args).
 * @function module:functionOps_.curry3_
 * @param fn {Function}
 * @returns {Function}
 */
curry3_ = exports.curry3_ = function curry3_(fn) {
  return curryN_(3, fn);
},


/**
 * Curries a functionOps up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 4 or more args).
 * @function module:functionOps_.curry4_
 * @param fn {Function}
 * @returns {Function}
 */
curry4_ = exports.curry4_ = function curry4_(fn) {
  return curryN_(4, fn);
},


/**
 * Curries a functionOps up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 5 or more args).
 * @function module:functionOps_.curry5_
 * @param fn {Function}
 * @returns {Function}
 */
curry5_ = exports.curry5_ = function curry5_(fn) {
  return curryN_(5, fn);
};