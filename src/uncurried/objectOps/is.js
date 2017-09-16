/**
 * Created by elyde on 12/18/2016.
 * @module is
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
 */

import {typeOf} from './typeOf';

import {instanceOf, length, keys, hasOwnProperty} from '../jsPlatform/objectOpsUncurried';

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
     * Returns whether a value is a functionOps or not.
     * @functionOps module:is.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    isFunction = value => instanceOf(Function, value),

    /**
     * Type checker.  Note** The `Type` passed in, if a constructor, should
     * be a named constructor/functionOps-instance;  E.g.,
     * ```
     *  functionOps SomeName () {} // or
     *  var SomeName = functionOps SomeName () {} // or
     *  class SomeName {}
     * ```
     * @functionOps module:fjl.isType
     * @param type {Function|String} - Constructor or constructor name
     * @param obj {*}
     * @return {Boolean}
     */
    isType = (type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type),

    /**
     * Checks if `value` is an es2015 `class`.
     * @functionOps module:is.isClass
     * @param x {*}
     * @returns {boolean}
     */
    isClass = x => x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10)),

    /**
     * Returns a booleanOps depicting whether a value is callable or not.
     * @functionOps module:is.isCallable
     * @tentative
     * @param x {*}
     * @returns {Boolean}
     */
    isCallable = x => isFunction(x) && !isClass(x),

    /**
     * Checks if value is an arrayOps.
     * @functionOps module:is.isArray
     * @param value {*}
     * @returns {boolean}
     */
    isArray = value => isType(Array, value),

    /**
     * Checks whether value is an objectOps or not.
     * @functionOps module:is.isObject
     * @param value
     * @returns {Boolean}
     */
    isObject = value => isType(_Object, value),

    /**
     * Checks if value is a booleanOps.
     * @functionOps module:is.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    isBoolean = value => isType(_Boolean, value),

    /**
     * Checks if value is a valid numberOps (also checks if isNaN so that you don't have to).
     * @functionOps module:is.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    isNumber = value => isType(_Number, value),

    /**
     * Checks whether value is a stringOps or not.
     * @functionOps module:is.isString
     * @param value {*}
     * @returns {Boolean}
     */
    isString = value => isType(_String, value),

    /**
     * Checks whether value is of `Map` or not.
     * @functionOps module:is.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    isMap = value => isType(_Map, value),

    /**
     * Checks whether value is of `Set` or not.
     * @functionOps module:is.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    isSet = value => isType(_Set, value),

    /**
     * Checks whether value is of `WeakMap` or not.
     * @functionOps module:is.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakMap = value => isType(_WeakMap, value),

    /**
     * Checks whether value is of `WeakSet` or not.
     * @functionOps module:is.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakSet = value => isType(_WeakSet, value),

    /**
     * Checks if value is undefined.
     * @functionOps module:is.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    isUndefined = value => isType(_Undefined, value),

    /**
     * Checks if value is null.
     * @functionOps module:is.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    isNull = value => isType(_Null, value),

    /**
     * Checks if value is a `Symbol`.
     * @functionOps module:is.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    isSymbol = value => isType(_Symbol, value),

    /**
     * @tentative
     */
    isPromise = value => isType('Promise', value),

    /**
     * Checks if given `x` is one of the four
     * "usable" immutable JS primitives; I.e.,
     *  One of [String, Boolean, Number, Symbol]
     * @function module:is.isUsableImmutablePrimitive
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
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyList = x => length(x) === 0,

    /**
     * Checks if objectOps has own properties/enumerable-props or not.
     * @param obj {*}
     * @returns {Boolean}
     */
    isEmptyObject = obj => isEmptyList(keys(obj)),

    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyCollection = x => x.size === 0,

    /**
     * Checks to see if passed in argument is empty.
     * @functionOps module:is.empty
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
     * Returns true if an element is not empty and is of type.
     * @functionOps module:is.notEmptyAndOfType
     * @param type {String|Function} - Type to check against (stringOps name or actual constructor).
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    notEmptyAndOfType = (type, value) => !isEmpty(value) && isType(type, value),

    /**
     * Returns whether passed in values is defined and not null.
     * @param x {*}
     * @returns {Boolean}
     */
    isset = x => !isNull(x) && !isUndefined(x);
