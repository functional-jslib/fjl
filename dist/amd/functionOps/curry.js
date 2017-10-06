define(["exports"], function (exports) {
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
  const PlaceHolder = function PlaceHolder() {},


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
  function curry(fn, ...argsToCurry) {
    return (...args) => {
      const concatedArgs = argsToCurry.concat(args);
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
    let out = array.map(element => {
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
  function curry_(fn, ...argsToCurry) {
    return (...args) => {
      let concatedArgs = replacePlaceHolders(argsToCurry, args),
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
  function curryN_(executeArity, fn, ...curriedArgs) {
    return (...args) => {
      let concatedArgs = replacePlaceHolders(curriedArgs, args),
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
  function curryN(executeArity, fn, ...curriedArgs) {
    return (...args) => {
      let concatedArgs = curriedArgs.concat(args),
          canBeCalled = concatedArgs.length >= executeArity || !executeArity;
      return !canBeCalled ? curryN.apply(null, [executeArity, fn].concat(concatedArgs)) : fn.apply(null, concatedArgs);
    };
  }

  let

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
  curry2_ = exports.curry2_ = fn => curryN_(2, fn),


  /**
   * Curries a functionOps up to an arity of 3 (takes into account placeholders `__` (arity enforcers)) (won't call functionOps until 3 or more args).
   * @function module:functionOps.curry3_
   * @param fn {Function}
   * @returns {Function}
   */
  curry3_ = exports.curry3_ = fn => curryN_(3, fn),


  /**
   * Curries a functionOps up to an arity of 4 (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 4 or more args).
   * @function module:functionOps.curry4_
   * @param fn {Function}
   * @returns {Function}
   */
  curry4_ = exports.curry4_ = fn => curryN_(4, fn),


  /**
   * Curries a functionOps up to an arity of 5  (takes into account placeholders `__` (arity enforcers))  (won't call functionOps until 5 or more args).
   * @function module:functionOps.curry5_
   * @param fn {Function}
   * @returns {Function}
   */
  curry5_ = exports.curry5_ = fn => curryN_(5, fn),


  /**
   * Curries a functionOps up to an arity of 2 (won't call functionOps until 2 or more args).
   * @function module:functionOps.curry2
   * @param fn {Function}
   * @returns {Function}
   */
  curry2 = exports.curry2 = fn => curryN(2, fn),


  /**
   * Curries a functionOps up to an arity of 3 (won't call functionOps until 3 or more args).
   * @function module:functionOps.curry3
   * @param fn {Function}
   * @returns {Function}
   */
  curry3 = exports.curry3 = fn => curryN(3, fn),


  /**
   * Curries a functionOps up to an arity of 4 (won't call functionOps until 4 or more args).
   * @function module:functionOps.curry4
   * @param fn {Function}
   * @returns {Function}
   */
  curry4 = exports.curry4 = fn => curryN(4, fn),


  /**
   * Curries a functionOps up to an arity of 5 (won't call functionOps until 5 or more args).
   * @function module:functionOps.curry5
   * @param fn {Function}
   * @returns {Function}
   */
  curry5 = exports.curry5 = fn => curryN(5, fn);
});