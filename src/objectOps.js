/**
 * @module objectOps
 */
import {curry, curry2} from './uncurried/functionOps/curry_';
import {
    instanceOf as _instanceOf,
    hasOwnProperty as _hasOwnProperty,
    assign as _assign} from './uncurried/jsPlatform/object_';
import {prop as _prop} from './uncurried/objectOps/prop_';
import {assignDeep as _assignDeep}      from './uncurried/objectOps/assignDeep_';
import {
    objUnion as _objUnion,
    objComplement as _objComplement,
    objIntersect as _objIntersect,
    objDifference as _objDifference}    from './uncurried/objectOps/setTheory_';
import {isType as _isType}
    from './uncurried/objectOps/is_';

export {length, toString, keys} from './uncurried/jsPlatform/object_';
export * from './uncurried/objectOps/typeOf_';
export * from './uncurried/objectOps/of_';
export {
    isFunction, isClass, isCallable, isArray, isObject, isBoolean,
    isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined,
    isNull, isSymbol, isUsableImmutablePrimitive,
    isEmptyList, isEmptyObject, isEmptyCollection, isEmpty, isset
} from './uncurried/objectOps/is_';

export {_instanceOf, _isType, _hasOwnProperty, _assign, _prop, _assignDeep, _objUnion,
_objComplement, _objIntersect, _objDifference};

export const

    prop = curry(_prop),

    /**
     * `instanceof` in function form.
     * @function module:objectOps.instanceOf
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
     * @function module:objectOps.isFunction
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Type checker.  Note** The `Type` passed in, if a constructor, should
     * be a named constructor/functionOps-instance;  E.g.,
     * ```
     *  functionOps SomeName () {} // or
     *  var SomeName = functionOps SomeName () {} // or
     *  class SomeName {}
     * ```
     * @function module:objectOps.isType
     * @param Type {Function|String} - Constructor or constructor name
     * @param value {*}
     * @return {Boolean}
     */
    isType = curry(_isType);

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:objectOps.isClass
     * @param x {*}
     * @returns {boolean}
     */

    /**
     * Returns a booleanOps depicting whether a value is callable or not.
     * @function module:objectOps.isCallable
     * @tentative
     * @private
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is an arrayOps.
     * @function module:objectOps.isArray
     * @param value {*}
     * @returns {boolean}
     */

    /**
     * Checks whether value is an object or not.
     * @function module:objectOps.isObject
     * @param value
     * @returns {Boolean}
     */

    /**
     * Checks if value is a booleanOps.
     * @function module:objectOps.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:objectOps.isNumber
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is a stringOps or not.
     * @function module:objectOps.isString
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `Map` or not.
     * @function module:objectOps.isMap
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `Set` or not.
     * @function module:objectOps.isSet
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:objectOps.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:objectOps.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is undefined.
     * @function module:objectOps.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is null.
     * @function module:objectOps.isNull
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Checks if value is a `Symbol`.
     * @function module:objectOps.isSymbol
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
     * @function module:objectOps.isUsableImmutablePrimitive
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if !length.
     * @function module:objectOps.isEmptyList
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks if object has own properties/enumerable-props or not.
     * @function module:objectOps.isEmptyObject
     * @param obj {*}
     * @returns {Boolean}
     */

    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @function module:objectOps.isEmptyCollection
     * @param x {*}
     * @returns {Boolean}
     */

    /**
     * Checks to see if passed in argument is empty.
     * @function module:objectOps.isEmpty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */

    /**
     * Returns whether passed in values is defined and not null.
     * @function module:objectOps.isset
     * @param x {*}
     * @returns {Boolean}
     */
