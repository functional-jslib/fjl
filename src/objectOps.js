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

    /**
     * Gives `undefined` or prop value if it is available.
     * @function module:objectOps.prop
     * @param propName {String}
     * @param obj {*} - Object to search.
     * @returns {*|undefined}
     * @curried
     */
    prop = curry(_prop),

    /**
     * `instanceof` in function form.
     * @function module:objectOps.instanceOf
     * @param instance {*}
     * @param Type {Function}
     * @returns {Boolean}
     * @curried
     */
    instanceOf = curry(_instanceOf),

    /**
     * `hasOwnProperty` as a method (takes object last).
     * @function module:objectOps.hasOwnProperty
     * @param propName {String}
     * @param obj {*} - Object to search.
     * @returns {Boolean}
     * @curried
     */
    hasOwnProperty = curry(_hasOwnProperty),

    /**
     * `Object.assign` if it is available else a shim.
     * @function module:objectOps.assign
     * @param [...obj]{Object} - One or more objects to merge onto first object.
     * @returns {Object}
     * @curried - Called after having two or more args
     */
    assign = curry2(_assign),

    /**
     * Same as `Object.assign` except does a deep merge.
     * @function module:objectOps.assignDeep
     * @param [...obj]{Object} - One or more objects to deep merge onto first object.
     * @returns {Object}
     * @curried - Called after having two or more args
     */
    assignDeep = curry2(_assignDeep),

    /**
     * Cartesian union for objects (operates on two objects).
     * @function module:objectOps.objUnion
     * @param obj1 {Object}
     * @param obj2 {Object}
     * @returns {Object} - Unified obj.
     * @curried
     */
    objUnion = curry(_objUnion),

    /**
     * Returns the cartesian intersection of two objects.
     * @function module:objectOps.objIntersect
     * @param obj1 {Object}
     * @param obj2 {Object}
     * @returns {Object} - Intersection of given objects.
     * @curried
     */
    objIntersect = curry(_objIntersect),

    /**
     * Returns the cartesian difference of two objects.
     * @function module:objectOps.objDifference
     * @param obj1 {Object}
     * @param obj2 {Object}
     * @returns {Object} - Difference of given objects.
     * @curried
     */
    objDifference = curry(_objDifference),

    /**
     * Returns the cartesian complement of one or more objects on given object.
     * @function module:objectOps.objDifference
     * @param obj {Object}
     * @param [...obj]{Object} - One or more objects to calculate complement from.
     * @returns {Object} - Complement of given objects.
     * @curried
     */
    objComplement = curry2(_objComplement),

    /**
     * Returns whether a value is a function or not.
     * @function module:objectOps.isFunction
     * @param value {*}
     * @returns {Boolean}
     */

    /**
     * Returns a boolean indicating whether a value is of given type or not.
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
     * Checks whether value is a string or not.
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
