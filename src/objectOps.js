/**
 * @module objectOps
 */
import {curry, curry2} from './uncurried/_functionOps/_curry';
import {
    instanceOf as _instanceOf,
    hasOwnProperty as _hasOwnProperty,
    assign as _assign} from './uncurried/_jsPlatform/_object';
import {prop as _prop} from './uncurried/_objectOps/_prop';
import {assignDeep as _assignDeep}      from './uncurried/_objectOps/_assignDeep';
import {
    objUnion as _objUnion,
    objComplement as _objComplement,
    objIntersect as _objIntersect,
    objDifference as _objDifference}    from './uncurried/_objectOps/_setTheory';
import {isType as _isType}
    from './uncurried/_objectOps/_is';

export {length, keys} from './uncurried/_jsPlatform/_object';
export * from './uncurried/_objectOps/_typeOf';
export * from './uncurried/_objectOps/_of';
export {
    isFunction, isClass, isCallable, isArray, isObject, isBoolean,
    isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined,
    isNull, isSymbol, isUsableImmutablePrimitive,
    isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, isset
} from './uncurried/_objectOps/_is';

export {_instanceOf, _isType, _hasOwnProperty, _assign, _prop, _assignDeep, _objUnion,
_objComplement, _objIntersect, _objDifference};

export const

    prop = curry(_prop),

    /**
     * `instanceof` in function form.
     * @function module:_objectOps.instanceOf
     * @param instance {*}
     * @param Type {Function}
     * @returns {Boolean}
     */
    instanceOf = curry(_instanceOf),

    hasOwnProperty = curry(_hasOwnProperty),

    assign = curry2(_assign),

    assignDeep = curry2(_assignDeep),

    objUnion = curry(_objUnion),

    objIntersect = curry(_objIntersect),

    objDifference = curry(_objDifference),

    objComplement = curry2(_objComplement),

    /**
     * Returns whether a value is a functionOps or not.
     * @function module:_objectOps.isFunction
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Type checker.  Note** The `Type` passed in, if a constructor, should
     * be a named constructor/_functionOps-instance;  E.g.,
     * ```
     *  _functionOps SomeName () {} // or
     *  var SomeName = _functionOps SomeName () {} // or
     *  class SomeName {}
     * ```
     * @function module:_objectOps.isType
     * @param Type {Function|String} - Constructor or constructor name
     * @param value {*}
     * @return {Boolean}
     */
    isType = curry(_isType);

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:_objectOps.isClass
     * @param x {*}
     * @returns {boolean}
     */

    /**
     * Returns a booleanOps depicting whether a value is callable or not.
     * @function module:_objectOps.isCallable
     * @tentative
     * @private
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is an arrayOps.
     * @function module:_objectOps.isArray
     * @param value {*}
     * @returns {boolean}
     */

    /**
     * Checks whether value is an object or not.
     * @function module:_objectOps.isObject
     * @param value
     * @returns {Boolean}
     */

    /**
     * Checks if value is a booleanOps.
     * @function module:_objectOps.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:_objectOps.isNumber
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is a stringOps or not.
     * @function module:_objectOps.isString
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `Map` or not.
     * @function module:_objectOps.isMap
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `Set` or not.
     * @function module:_objectOps.isSet
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:_objectOps.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:_objectOps.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is undefined.
     * @function module:_objectOps.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is null.
     * @function module:_objectOps.isNull
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is a `Symbol`.
     * @function module:_objectOps.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * @tentative
     * @private
     */

    /**
     * Checks if given `x` is one of the four
     * "usable" immutable JS primitives; I.e.,
     *  One of [String, Boolean, Number, Symbol]
     * @function module:_objectOps.isUsableImmutablePrimitive
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if !length.
     * @function module:_objectOps.isEmptyList
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if object has own properties/enumerable-props or not.
     * @function module:_objectOps.isEmptyObject
     * @param obj {*}
     * @returns {Boolean}
     */

    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @function module:_objectOps.isEmptyCollection
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks to see if passed in argument is empty.
     * @function module:_objectOps.isEmpty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */

    /**
     * Returns whether passed in values is defined and not null.
     * @function module:_objectOps.isset
     * @param x {*}
     * @returns {Boolean}
     */
