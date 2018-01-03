/**
 * Created by elyde on 12/18/2016.
 * @memberOf objectOps_
 */

import {typeOf} from './typeOf_';
import {instanceOf, length, keys, hasOwnProperty} from '../_jsPlatform/object_';

let _String = String.name,
    _Number = Number.name,
    _Object = Object.name,
    _Boolean = Boolean.name,
    _Function = Function.name,
    _Array = Array.name,
    _Symbol = 'Symbol',
    _Map = 'Map',
    _Set = 'Set',
    _WeakMap = 'WeakMap',
    _WeakSet = 'WeakSet',
    _Null = 'Null',
    _Undefined = 'Undefined';

export const

    /**
     * Returns whether a value is a _functionOps or not.
     * @function module:objectOps_.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    isFunction = value => instanceOf(Function, value),

    /**
     * Type checker.  Note** The `Type` passed in, if a constructor, should
     * be a named constructor/_functionOps-instance;  E.g.,
     * ```
     *  _functionOps SomeName () {} // or
     *  var SomeName = _functionOps SomeName () {} // or
     *  class SomeName {}
     * ```
     * @function module:objectOps_.isType
     * @param type {Function|String} - Constructor or constructor name
     * @param obj {*}
     * @return {Boolean}
     */
    isType = (type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type),

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:objectOps_.isClass
     * @param x {*}
     * @returns {boolean}
     */
    isClass = x => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10)),

    /**
     * Returns a booleanOps depicting whether a value is callable or not.
     * @function module:objectOps_.isCallable
     * @tentative
     * @private
     * @param x {*}
     * @returns {Boolean}
     */
    isCallable = x => isFunction(x) && !isClass(x),

    /**
     * Checks if value is an arrayOps.
     * @function module:objectOps_.isArray
     * @param value {*}
     * @returns {boolean}
     */
    isArray = value => isType(Array, value),

    /**
     * Checks whether value is an object or not.
     * @function module:objectOps_.isObject
     * @param value
     * @returns {Boolean}
     */
    isObject = value => isType(_Object, value),

    /**
     * Checks if value is a booleanOps.
     * @function module:objectOps_.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    isBoolean = value => isType(_Boolean, value),

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:objectOps_.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    isNumber = value => isType(_Number, value),

    /**
     * Checks whether value is a stringOps or not.
     * @function module:objectOps_.isString
     * @param value {*}
     * @returns {Boolean}
     */
    isString = value => isType(_String, value),

    /**
     * Checks whether value is of `Map` or not.
     * @function module:objectOps_.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    isMap = value => isType(_Map, value),

    /**
     * Checks whether value is of `Set` or not.
     * @function module:objectOps_.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    isSet = value => isType(_Set, value),

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:objectOps_.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakMap = value => isType(_WeakMap, value),

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:objectOps_.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakSet = value => isType(_WeakSet, value),

    /**
     * Checks if value is undefined.
     * @function module:objectOps_.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    isUndefined = value => isType(_Undefined, value),

    /**
     * Checks if value is null.
     * @function module:objectOps_.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    isNull = value => isType(_Null, value),

    /**
     * Checks if value is a `Symbol`.
     * @function module:objectOps_.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    isSymbol = value => isType(_Symbol, value),

    /**
     * Checks if given `x` is one of the four
     * "usable" immutable JS primitives; I.e.,
     *  One of [String, Boolean, Number, Symbol]
     * @function module:objectOps_.isUsableImmutablePrimitive
     * @param x {*}
     * @returns {Boolean}
     */
    isUsableImmutablePrimitive = x => {
        const typeOfX = typeOf(x);
        return [_String, _Number, _Boolean, _Symbol]
            .some(Type => Type === typeOfX);
    },

    /**
     * Checks if !length.
     * @function module:_objectOps.isEmptyList
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyList = x => !length(x),

    /**
     * Checks if object has own properties/enumerable-props or not.
     * @function module:_objectOps.isEmptyObject
     * @param obj {*}
     * @returns {Boolean}
     */
    isEmptyObject = obj => isEmptyList(keys(obj)),

    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @function module:objectOps_.isEmptyCollection
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyCollection = x => x.size === 0,

    /**
     * Checks to see if passed in argument is empty.
     * @function module:objectOps_.isEmpty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    isEmpty = value => {
        let typeOfValue = typeOf(value),
            retVal;

        if (!value) { // '', 0, `null`, `undefined` or `false` then is empty
            retVal = true;
        }
        else if (typeOfValue === _Array || typeOfValue === _Function) {
            retVal = isEmptyList(value);
        }
        else if (typeOfValue === _Number && value !== 0) {
            retVal = false;
        }
        else if (typeOfValue === _Object) {
            retVal = isEmptyObject(value);
        }
        else if (hasOwnProperty('size', value)) {
            retVal = isEmptyCollection(value);
        }
        else {
            retVal = !value;
        }
        return retVal;
    },

    /**
     * Returns whether passed in values is defined and not null or not.
     * @function module:objectOps_.isset
     * @param x {*}
     * @returns {Boolean}
     */
    isset = x => !isNull(x) && !isUndefined(x);