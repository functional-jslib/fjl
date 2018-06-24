/**
 * Created by elyde on 12/18/2016.
 * @memberOf _object
 */

import {typeOf} from './_typeOf';
import {_instanceOf, length, keys, _hasOwnProperty} from '../_jsPlatform/_object';

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
     * Returns whether a value is a _function or not.
     * @function module:object._isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    isFunction = value => _instanceOf(Function, value),

    /**
     * Type checker.  Note** The `Type` passed in, if a constructor, should
     * be a named constructor/_function-instance;  E.g.,
     * ```
     *  _function SomeName () {} // or
     *  var SomeName = _function SomeName () {} // or
     *  class SomeName {}
     * ```
     * @function module:object._isType
     * @param type {Function|ObjectConstructor|String} - Constructor or constructor name
     * @param obj {*}
     * @return {Boolean}
     */
    _isType = (type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type),

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:object._isClass
     * @param x {*}
     * @returns {boolean}
     */
    isClass = x => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10)),

    /**
     * Returns a boolean depicting whether a value is callable or not.
     * @function module:object._isCallable
     * @tentative
     * @param x {*}
     * @returns {Boolean}
     */
    isCallable = x => isFunction(x) && !isClass(x),

    /**
     * Checks if value is an array (same as `Array.isArray`).
     * @function module:object._isArray
     * @param value {*}
     * @returns {boolean}
     */
    {isArray} = Array,

    /**
     * Checks whether value is an object or not.
     * @function module:object._isObject
     * @param value
     * @returns {Boolean}
     */
    isObject = value => _isType(_Object, value),

    /**
     * Checks if value is a boolean.
     * @function module:object._isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    isBoolean = value => _isType(_Boolean, value),

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:object._isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    isNumber = value => _isType(_Number, value),

    /**
     * Checks whether value is a string or not.
     * @function module:object._isString
     * @param value {*}
     * @returns {Boolean}
     */
    isString = value => _isType(_String, value),

    /**
     * Checks whether value is of `Map` or not.
     * @function module:object._isMap
     * @param value {*}
     * @returns {Boolean}
     */
    isMap = value => _isType(_Map, value),

    /**
     * Checks whether value is of `Set` or not.
     * @function module:object._isSet
     * @param value {*}
     * @returns {Boolean}
     */
    isSet = value => _isType(_Set, value),

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:object._isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakMap = value => _isType(_WeakMap, value),

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:object._isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakSet = value => _isType(_WeakSet, value),

    /**
     * Checks if value is undefined.
     * @function module:object._isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    isUndefined = value => _isType(_Undefined, value),

    /**
     * Checks if value is null.
     * @function module:object._isNull
     * @param value {*}
     * @returns {Boolean}
     */
    isNull = value => _isType(_Null, value),

    /**
     * Checks if value is a `Symbol`.
     * @function module:object._isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    isSymbol = value => _isType(_Symbol, value),

    /**
     * Checks if given `x` is set and of one of
     *  [String, Boolean, Number, Symbol] (null and undefined are immutable
     *  but are not "usable" (usually not what we want to operate on).
     * @function module:object._isUsableImmutablePrimitive
     * @param x {*}
     * @returns {Boolean}
     */
    isUsableImmutablePrimitive = x => {
        const typeOfX = typeOf(x);
        return isset(x) &&
            [_String, _Number, _Boolean, _Symbol]
                .some(Type => Type === typeOfX);
    },

    /**
     * Checks if !length.
     * @function module:object._isEmptyList
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyList = x => !length(x),

    /**
     * Checks if object has own properties/enumerable-props or not.
     * @function module:object._isEmptyObject
     * @param obj {*}
     * @returns {Boolean}
     */
    isEmptyObject = obj => isEmptyList(keys(obj)),

    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @function module:object._isEmptyCollection
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyCollection = x => x.size === 0,

    /**
     * Checks to see if passed in value is empty;  I.e.,
     *  check for one of '', 0, `null`, `undefined`, `false`, empty array, empty object, empty function (zero arity),
     *  or empty collection (es6 Map, Set, WeakMap, or WeakSet etc. (`!value.size`);
     * @function module:object._isEmpty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    isEmpty = value => {
        let retVal;
        if (!value) { // if '', 0, `null`, `undefined`, or `false` then is empty
            retVal = true;
        }

        const typeOfValue = typeOf(value);
        if (typeOfValue === _Array || typeOfValue === _Function) {
            retVal = isEmptyList(value);
        }
        else if (typeOfValue === _Number) {
            retVal = false;
        }
        else if (typeOfValue === _Object) {
            retVal = isEmptyObject(value);
        }
        else if (_hasOwnProperty('size', value) && isNumber(value.size)) {
            retVal = isEmptyCollection(value);
        }
        else {
            retVal = !value;
        }
        return retVal;
    },

    /**
     * Returns whether passed in values is defined and not null or not.
     * @function module:object._isset
     * @param x {*}
     * @returns {Boolean}
     */
    isset = x => x !== null && x !== undefined;
