/**
 * Created by elyde on 12/18/2016.
 * @memberOf objectOps
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
 * @todo Use the ucurried versions of the methods here from the '../uncurried/*' packages.
 */
import {curry} from   '../uncurried/functionOps/curry_';
import {isType as _isType, isEmpty} from '../uncurried/objectOps/is_';
export {isEmpty};
export {
    isFunction, isClass, isCallable, isArray, isObject, isBoolean,
    isNumber, isString, isMap, isSet, isWeakMap, isWeakSet, isUndefined,
    isNull, isSymbol, isPromise, isUsableImmutablePrimitive,
    isEmptyList, isEmptyObject, isEmptyCollection, isset
} from '../uncurried/objectOps/is_';

export const

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
    isType = curry(_isType),

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
     * @function module:objectOps_.isEmptyCollection
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
     * Returns true if an element is not empty and is of type.
     * @function module:objectOps.notEmptyAndOfType
     * @tentative
     * @private* @param type {String|Function} - Type to check against (stringOps name or actual constructor).
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    notEmptyAndOfType = curry((type, value) => !isEmpty(value) && isType(type, value))

    /**
     * Returns whether passed in values is defined and not null.
     * @function module:objectOps.isset
     * @param x {*}
     * @returns {Boolean}
     */
    ;
