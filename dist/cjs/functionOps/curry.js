"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.curry = curry;
exports.curry_ = curry_;
exports.curryN_ = curryN_;
exports.curryN = curryN;
/**
 * @author elydelacruz
 * @created 12/6/2016.
 * @memberOf functionOps
 * @description Different curry implementations for modern javascript currying.
 * @todo Make code here more minimal (reuse small parts here).
 * @todo separate curry_ (and it's variants) into a separate file/module.
 */

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
 * Curries a function based on it's defined arity (argument's arrayOps expected length).
 * @function module:functionOps.curry
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
function curry(fn) {
  for (var _len = arguments.length, argsToCurry = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argsToCurry[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var concatedArgs = argsToCurry.concat(args);
    return concatedArgs.length < fn.length ? curry.apply(null, [fn].concat(concatedArgs)) : fn.apply(null, concatedArgs);
  };
}

/**
 * Checks to see if value is a `PlaceHolder`.
 * @function isPlaceHolder
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
 * @param array {Array} - Array to replace placeholders in.
 * @param args {Array} - Args from to choose from to replace placeholders.
 * @returns {Array|*} - Returns passed in `listOps` with placeholders replaced by values in `args`.
 * @private
 */
function replacePlaceHolders(array, args) {
  var out = array.map(function (element) {
    if (!isPlaceHolder(element)) {
      return element;
    } else if (args.length > 0) {
      return args.shift();
    }
    return element;
  });
  return args.length > 0 ? out.concat(args) : out;
}

/**
 * Curries passed in functionOps up to given arguments length (can enforce arity via placeholder values (`__`)).
 * @function module:functionOps.curry_
 * @param fn {Function}
 * @param argsToCurry {...*}
 * @returns {Function}
 */
function curry_(fn) {
  for (var _len3 = arguments.length, argsToCurry = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    argsToCurry[_key3 - 1] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    var concatedArgs = replacePlaceHolders(argsToCurry, args),
        placeHolders = concatedArgs.filter(isPlaceHolder),
        canBeCalled = placeHolders.length === 0 && concatedArgs.length >= fn.length;
    return canBeCalled ? fn.apply(null, concatedArgs) : curry_.apply(null, [fn].concat(concatedArgs));
  };
}

/**
 * Curries a functionOps up to given arity also enforces arity via placeholder values (`__`).
 * @function module:functionOps.curryN_
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*} - Allows `Placeholder` (`__`) values.
 * @returns {Function} - Passed in functionOps wrapped in a functionOps for currying.
 */
function curryN_(executeArity, fn) {
  for (var _len5 = arguments.length, curriedArgs = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
    curriedArgs[_key5 - 2] = arguments[_key5];
  }

  return function () {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    var concatedArgs = replacePlaceHolders(curriedArgs, args),
        placeHolders = concatedArgs.filter(isPlaceHolder),
        canBeCalled = concatedArgs.length - placeHolders.length >= executeArity || !executeArity;
    return !canBeCalled ? curryN_.apply(null, [executeArity, fn].concat(concatedArgs)) : fn.apply(null, concatedArgs);
  };
}

/**
 * Curries a functionOps up to a given arity.
 * @function module:functionOps.curryN
 * @param executeArity {Number}
 * @param fn {Function}
 * @param curriedArgs {...*}
 * @returns {Function}
 */
function curryN(executeArity, fn) {
  for (var _len7 = arguments.length, curriedArgs = Array(_len7 > 2 ? _len7 - 2 : 0), _key7 = 2; _key7 < _len7; _key7++) {
    curriedArgs[_key7 - 2] = arguments[_key7];
  }

  return function () {
    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    var concatedArgs = curriedArgs.concat(args),
        canBeCalled = concatedArgs.length >= executeArity || !executeArity;
    return !canBeCalled ? curryN.apply(null, [executeArity, fn].concat(concatedArgs)) : fn.apply(null, concatedArgs);
  };
}

var

/**
 * Place holder object (frozen) used by curry.
 * @memberOf functionOps
 * @type {PlaceHolder}
 */
__ = exports.__ = Object.freeze ? Object.freeze(placeHolderInstance) : placeHolderInstance,


/**
 * Curries a functionOps up to an arity of 2 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 2 or more args).
 * @function module:functionOps.curry2_
 * @param fn {Function}
 * @returns {Function}
 */
curry2_ = exports.curry2_ = function curry2_(fn) {
  return curryN_(2, fn);
},


/**
 * Curries a functionOps up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 3 or more args).
 * @function module:functionOps.curry3_
 * @param fn {Function}
 * @returns {Function}
 */
curry3_ = exports.curry3_ = function curry3_(fn) {
  return curryN_(3, fn);
},


/**
 * Curries a functionOps up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 4 or more args).
 * @function module:functionOps.curry4_
 * @param fn {Function}
 * @returns {Function}
 */
curry4_ = exports.curry4_ = function curry4_(fn) {
  return curryN_(4, fn);
},


/**
 * Curries a functionOps up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 5 or more args).
 * @function module:functionOps.curry5_
 * @param fn {Function}
 * @returns {Function}
 */
curry5_ = exports.curry5_ = function curry5_(fn) {
  return curryN_(5, fn);
},


/**
 * Curries a functionOps up to an arity of 2 (won't call functionOps until 2 or more args).
 * @function module:functionOps.curry2
 * @param fn {Function}
 * @returns {Function}
 */
curry2 = exports.curry2 = function curry2(fn) {
  return curryN(2, fn);
},


/**
 * Curries a functionOps up to an arity of 3 (won't call functionOps until 3 or more args).
 * @function module:functionOps.curry3
 * @param fn {Function}
 * @returns {Function}
 */
curry3 = exports.curry3 = function curry3(fn) {
  return curryN(3, fn);
},


/**
 * Curries a functionOps up to an arity of 4 (won't call functionOps until 4 or more args).
 * @function module:functionOps.curry4
 * @param fn {Function}
 * @returns {Function}
 */
curry4 = exports.curry4 = function curry4(fn) {
  return curryN(4, fn);
},


/**
 * Curries a functionOps up to an arity of 5 (won't call functionOps until 5 or more args).
 * @function module:functionOps.curry5
 * @param fn {Function}
 * @returns {Function}
 */
curry5 = exports.curry5 = function curry5(fn) {
  return curryN(5, fn);
};