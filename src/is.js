/**
 * Created by elyde on 12/18/2016.
 */
/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {curry2} from './curry';
import {typeOf, typeOfIs} from './typeOf';

let _String = String.name,
    _Function = Function.name,
    _Array = Array.name,
    _Number = Number.name,
    _Object = Object.name,
    _Boolean = Boolean.name,
    _Map = 'Map',
    _Set = 'Set',
    _WeakMap = 'WeakMap',
    _WeakSet = 'WeakSet',
    _Null = 'Null',
    _Undefined = 'Undefined',
    _undefined = 'undefined';

/**
 * Returns whether constructor has derived object.
 * @instanceConstructor {Function|Class}
 * @instance {*}
 * @returns {Boolean}
 */
export const instanceOf = curry2((instanceConstructor, instance) => {
        return instance instanceof instanceConstructor;
    });

/**
 * Checks if `value` is an es2015 `class`.
 * @function module:fjl.isClass
 * @param value {*}
 * @returns {boolean}
 */
export function isClass (value) {
    return value && /^\s{0,3}class\s{1,3}/.test(value.toString().substr(0, 10));
}

/**
 * Returns whether a value is a function or not.
 * @function module:sjl.isFunction
 * @param value {*}
 * @returns {Boolean}
 */
export function isFunction (value) {
    return !isClass(value) && value instanceof Function;
}

/**
 * Checks to see if value passed in is set (not undefined and not null).
 * @function module:sjl.isset
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
export function isset (value) {
    return typeof value !== _undefined && value !== null;
}

/**
 * Checks whether a value isset and if it's type is the same as the type name passed in.
 * @function module:sjl.issetAndOfType
 * @param value {*} - Value to check on.
 * @param type {String|Function} - Constructor name string or Constructor.  You can pass one or more types.
 * @returns {Boolean}
 */
export function issetAndOfType (value, type) {
    return isset(value) && typeOfIs(type, value);
}

/**
 * Checks if value is an array.
 * @function module:sjl.isArray
 * @param value {*}
 * @returns {boolean}
 */
export function isArray (value) {
    return typeOfIs(Array, value);
}

/**
 * Checks whether value is an object or not.
 * @function module:sjl.isObject
 * @param value
 * @returns {Boolean}
 */
export function isObject (value) {
    return typeOfIs(_Object, value);
}

/**
 * Checks if value is a boolean.
 * @function module:sjl.isBoolean
 * @param value {*}
 * @returns {Boolean}
 */
export function isBoolean (value) {
    return typeOfIs(_Boolean, value);
}

/**
 * Checks if value is a valid number (also checks if isNaN so that you don't have to).
 * @function module:sjl.isNumber
 * @param value {*}
 * @returns {Boolean}
 */
export function isNumber (value) {
    return typeOfIs(_Number, value);
}

/**
 * Checks whether value is a string or not.
 * @function module:sjl.isString
 * @param value {*}
 * @returns {Boolean}
 */
export function isString(value) {
    return typeOfIs(_String, value);
}

/**
 * Checks whether value is of `Map` or not.
 * @function module:sjl.isMap
 * @param value {*}
 * @returns {Boolean}
 */
export function isMap(value) {
    return typeOfIs(_Map, value);
}

/**
 * Checks whether value is of `Set` or not.
 * @function module:sjl.isSet
 * @param value {*}
 * @returns {Boolean}
 */
export function isSet(value) {
    return typeOfIs(_Set, value);
}

/**
 * Checks whether value is of `WeakMap` or not.
 * @function module:sjl.isWeakMap
 * @param value {*}
 * @returns {Boolean}
 */
export function isWeakMap(value) {
    return typeOfIs(_WeakMap, value);
}

/**
 * Checks whether value is of `WeakSet` or not.
 * @function module:sjl.isWeakSet
 * @param value {*}
 * @returns {Boolean}
 */
export function isWeakSet(value) {
    return typeOfIs(_WeakSet, value);
}

/**
 * Checks if value is undefined.
 * @function module:sjl.isUndefined
 * @param value {*}
 * @returns {Boolean}
 */
export function isUndefined (value) {
    return typeOfIs(_Undefined, value);
}

/**
 * Checks if value is null.
 * @function module:sjl.isNull
 * @param value {*}
 * @returns {Boolean}
 */
export function isNull (value) {
    return typeOfIs(_Null, value);
}

/**
 * Checks if value is a `Symbol`.
 * @function module:sjl.isSymbol
 * @param value {*}
 * @returns {Boolean}
 */
export function isSymbol (value) {
    return typeOfIs('Symbol', value);
}

/**
 * Checks to see if passed in argument is empty.
 * @function module:sjl.empty
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
export function isEmpty(value) {
    let typeOfValue = typeOf(value),
        retVal;

    if (typeOfValue === _Array || typeOfValue === _String || typeOfValue === _Function) {
        retVal = value.length === 0;
    }
    else if (typeOfValue === _Number && value !== 0) {
        retVal = false;
    }
    else if (typeOfValue === _Object) {
        retVal = Object.keys(value).length === 0;
    }
    else {
        retVal = !value;
    }
    return retVal;
}

/**
 * Checks to see if value can be constructed from a constructor.
 * @param value {*}
 * @returns {Boolean}
 */
export function isConstructablePrimitive (value) {
    return [
        isNumber, isBoolean, isString, isObject,
        isArray, isFunction, isMap, isSet,
        isWeakMap, isWeakSet
    ].some(fn => fn(value));
}

export default {
    isset,
    issetAndOfType,
    isNumber,
    isFunction,
    isClass,
    isArray,
    isBoolean,
    isObject,
    isString,
    isMap,
    isSet,
    isWeakMap,
    isWeakSet,
    isUndefined,
    isNull,
    isSymbol,
    isEmpty,
    instanceOf,
    isConstructablePrimitive
};
