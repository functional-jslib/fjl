/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

let _String = String.name,
    _Function = Function.name,
    _Array = Array.name,
    _Number = Number.name,
    _Object = Object.name,
    _Boolean = Boolean.name,
    _NaN = 'NaN',
    _Null = 'Null',
    _Undefined = 'Undefined',
    _undefined = 'undefined';

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
 * Returns the class name of an object from it's class string.
 * @note Returns 'NaN' if value type is 'Number' and value isNaN evaluates to true as of version 0.4.85.
 * @note If your type (constructor/class) overrides it's `toString` method use a named `toString` method to get the accurate constructor name out of `typeOf`;  E.g., If you do override `toString` on your class(es) and don't set them to named functions then `sjl.typeOf*` will use Object.prototype.toString to pull your classes type out.
 * @function module:sjl.typeOf
 * @param value {*}
 * @returns {string} - A string representation of the type of the value; E.g., 'Number' for `0`
 */
export function typeOf (value) {
    var retVal;
    if (typeof value === _undefined) {
        retVal = _Undefined;
    }
    else if (value === null) {
        retVal = _Null;
    }
    else {
        let constructorName = (value).constructor.name;
        retVal = constructorName === _Number && isNaN(value) ?
            _NaN : constructorName;
    }
    return retVal;
}

/**
 * Checks to see if an object is of type 'constructor name'.
 * Note: If passing in constructors as your `type` to check, ensure they are *'named' constructors
 * as the `name` property is checked directly on them to use in the class/constructor-name comparison.
 * *'named' constructors - Not anonymous functions/constructors but ones having a name:  E.g.,
 * ```
 * (function Hello () {}) // Named function.
 * (function () {}) // Anonymous function.
 * ```
 * @function module:sjl.typeOfIs
 * @param obj {*} - Object to be checked.
 * @param type {String|Function} - Either a constructor name or an constructor itself.
 * @returns {Boolean} - Whether object matches class string or not.
 */
export function typeOfIs (obj, type) {
    return typeOf(obj) === (isFunction(type) ? type.name : type);
}

/**
 * Check if `value` is of one of the passed in types.
 * @function module:sjl.typeOfIsMulti
 * @param value {*}
 * @param types {...Function|...String} - Constructor or string.
 * @returns {boolean}
 */
export function typeOfIsMulti (value, ...types) {
    return types.some(_type => typeOfIs(value, _type));
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
 * Checks if one or more parameters are set (not null and not undefined).
 * @function module:sjl.issetMulti
 * @params {*} - One or more values to check of any type.
 * @returns {Boolean} - True if all params passed in are not null or undefined.
 */
export function issetMulti (...args) {
    return !args.some(value => !isset(value));
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
 * Checks object's own properties to see if it is empty (Object.keys check).
 * @function module:sjl.isEmptyObj
 * @param obj object to be checked
 * @returns {Boolean}
 */
export function isEmptyObj(obj) {
    return Object.keys(obj).length === 0;
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
        retVal = isEmptyObj(value);
    }
    else {
        retVal = !value;
    }

    return retVal;
}

/**
 * Checks to see if any of the values passed in are empty (null, undefined, empty object, empty array, or empty string).
 * @function module:sjl.emptyMulti
 * @params {*} - One or more params of any type.
 * @returns {Boolean} - Returns true if any of the values passed in are empty (null, undefined, empty object, empty array, or empty string).
 */
export function isEmptyMulti (...args) {
    return args.some(value => isEmpty(value));
}

/**
 * Retruns a boolean based on whether a key on an object has an empty value or is empty (not set, undefined, null)
 * @function module:sjl.notTypeOrEmpty
 * @param value {Object} - Object to search on.
 * @param type {String} - Optional. Type Name to check for match for;  E.g., 'Number', 'Array', 'HTMLMediaElement' etc..
 * @deprecated - Will be removed in version 6.0.0.  Use `notEmptyAndOfType` instead.
 * @returns {Boolean}
 */
export function notTypeOrEmpty (value, type) {
    return isEmpty(value) || !typeOfIs(value, type);
}

/**
 * Returns true if an element is not empty and is of type.
 * @function module:sjl.notEmptyAndOfType
 * @param value {*} - Value to check.
 * @param type {String|Function} - Type to check against (string name or actual constructor).
 * @returns {Boolean}
 */
export function notEmptyAndOfType (value, type) {
    return !isEmpty(value) && typeOfIs(value, type);
}

export default {
    isset,
    issetMulti,
    issetAndOfType,
    typeOf,
    typeOfIs,
    typeOfIsMulti,
    isNumber,
    isFunction,
    isArray,
    isBoolean,
    isObject,
    isString,
    isUndefined,
    isNull,
    isSymbol,
    isEmpty,
    isEmptyMulti,
    isEmptyObj,
    notTypeOrEmpty,
    notEmptyAndOfType
};
