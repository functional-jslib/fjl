/**
 * Created by elyde on 12/18/2016.
 * @module is
 */
import {curry} from './curry';
import {typeOf} from './typeOf';
import {instanceOf} from './instanceOf';

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
    _Undefined = 'Undefined',
    _undefined = 'undefined';

export const

    /**
     * Type checker.  Note** The `Type` passed in, if a constructor, should
     * be a named constructor/function-instance;  E.g.,
     * ```
     *  function SomeName () {} // or
     *  var SomeName = function SomeName () {} // or
     *  class SomeName {}
     * ```
     * @function module:fjl.isType
     * @param Type {Function|String} - Constructor or constructor name
     * @param value {*}
     * @return {Boolean}
     */
    isType = curry((type, obj) => typeOf(obj) === (instanceOf(Function, type) ? type.name : type)),

    /**
     * Checks to see if value passed in is set (not undefined and not null).
     * @function module:is.isset
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    isset = value => typeof value !== _undefined && value !== null,

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:is.isClass
     * @param value {*}
     * @returns {boolean}
     */
    isClass = value => value && /^\s{0,3}class\s{1,3}/.test(value.toString().substr(0, 10)),

    /**
     * Returns whether a value is a function or not.
     * @function module:is.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    isFunction = value => !isClass(value) && instanceOf(Function, value),

    /**
     * Checks if value is an array.
     * @function module:is.isArray
     * @param value {*}
     * @returns {boolean}
     */
    isArray = value => isType(Array, value),

    /**
     * Checks whether value is an object or not.
     * @function module:is.isObject
     * @param value
     * @returns {Boolean}
     */
    isObject = value => isType(_Object, value),

    /**
     * Checks if value is a boolean.
     * @function module:is.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    isBoolean = value => isType(_Boolean, value),

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:is.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    isNumber = value => isType(_Number, value),

    /**
     * Checks whether value is a string or not.
     * @function module:is.isString
     * @param value {*}
     * @returns {Boolean}
     */
    isString = value => isType(_String, value),

    /**
     * Checks whether value is of `Map` or not.
     * @function module:is.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    isMap = value => isType(_Map, value),

    /**
     * Checks whether value is of `Set` or not.
     * @function module:is.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    isSet = value => isType(_Set, value),

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:is.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakMap = value =>isType(_WeakMap, value),

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:is.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakSet = value => isType(_WeakSet, value),

    /**
     * Checks if value is undefined.
     * @function module:is.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    isUndefined = value => isType(_Undefined, value),

    /**
     * Checks if value is null.
     * @function module:is.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    isNull = value => value === null,

    /**
     * Checks if value is a `Symbol`.
     * @function module:is.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    isSymbol = value => isType('Symbol', value),

    /**
     * Checks to see if passed in argument is empty.
     * @function module:is.empty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    isEmpty = value => {
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
    },

    /**
     * Returns true if an element is not empty and is of type.
     * @function module:is.notEmptyAndOfType
     * @param type {String|Function} - Type to check against (string name or actual constructor).
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    notEmptyAndOfType = curry((type, value) => !isEmpty(value) && isType(type, value));
