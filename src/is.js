/**
 * Created by elyde on 12/18/2016.
 */
/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {pureCurry2} from './curry';
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
 * Returns whether object is an instance of constructor passed in parameter 1.
 * @instanceConstructor {Function|Class}
 * @instance {*}
 * @returns {Boolean}
 */
export const instanceOf = pureCurry2((instanceConstructor, instance) => {
        return instance instanceof instanceConstructor;
    });

/**
 * Returns whether a value is a function or not.
 * @function module:sjl.isFunction
 * @param value {*}
 * @returns {Boolean}
 */
export function isFunction (value) {
    return value instanceof Function;
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
    return isset(value) && typeOfIs(value, type);
}

/**
 * Checks if value is an array.
 * @function module:sjl.isArray
 * @param value {*}
 * @returns {boolean}
 */
export function isArray (value) {
    return Array.isArray(value);
}

/**
 * Checks whether value is an object or not.
 * @function module:sjl.isObject
 * @param value
 * @returns {Boolean}
 */
export function isObject (value) {
    return typeOfIs(value, _Object);
}

/**
 * Checks if value is a boolean.
 * @function module:sjl.isBoolean
 * @param value {*}
 * @returns {Boolean}
 */
export function isBoolean (value) {
    return typeOfIs(value, _Boolean);
}

/**
 * Checks if value is a valid number (also checks if isNaN so that you don't have to).
 * @function module:sjl.isNumber
 * @param value {*}
 * @returns {Boolean}
 */
export function isNumber (value) {
    return typeOfIs(value, _Number);
}

/**
 * Checks whether value is a string or not.
 * @function module:sjl.isString
 * @param value {*}
 * @returns {Boolean}
 */
export function isString(value) {
    return typeOfIs(value, _String);
}

/**
 * Checks whether value is of `Map` or not.
 * @function module:sjl.isMap
 * @param value {*}
 * @returns {Boolean}
 */
export function isMap(value) {
    return typeOfIs(value, _Map);
}

/**
 * Checks whether value is of `Set` or not.
 * @function module:sjl.isSet
 * @param value {*}
 * @returns {Boolean}
 */
export function isSet(value) {
    return typeOfIs(value, _Set);
}

/**
 * Checks whether value is of `WeakMap` or not.
 * @function module:sjl.isWeakMap
 * @param value {*}
 * @returns {Boolean}
 */
export function isWeakMap(value) {
    return typeOfIs(value, _WeakMap);
}

/**
 * Checks whether value is of `WeakSet` or not.
 * @function module:sjl.isWeakSet
 * @param value {*}
 * @returns {Boolean}
 */
export function isWeakSet(value) {
    return typeOfIs(value, _WeakSet);
}

/**
 * Checks if value is undefined.
 * @function module:sjl.isUndefined
 * @param value {*}
 * @returns {Boolean}
 */
export function isUndefined (value) {
    return typeOfIs(value, _Undefined);
}

/**
 * Checks if value is null.
 * @function module:sjl.isNull
 * @param value {*}
 * @returns {Boolean}
 */
export function isNull (value) {
    return typeOfIs(value, _Null);
}

/**
 * Checks if value is a `Symbol`.
 * @function module:sjl.isSymbol
 * @param value {*}
 * @returns {Boolean}
 */
export function isSymbol (value) {
    return typeOfIs(value, 'Symbol');
}

/**
 * Checks to see if passed in argument is empty.
 * @function module:sjl.empty
 * @param value {*} - Value to check.
 * @returns {Boolean}
 */
export function isEmpty(value) {
    let typeOfValue = typeOf(value);
    var retVal;

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
