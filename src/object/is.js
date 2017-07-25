/**
 * Created by elyde on 12/18/2016.
 * @module is
 * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
 */
import {curry} from '../function/curry';
import {typeOf} from './typeOf';
import {instanceOf} from './instanceOf';

let _String = String.name,
    _Number = Number.name,
    _Object = Object.name,
    _Boolean = Boolean.name,
    _Map = 'Map',
    _Set = 'Set',
    _WeakMap = 'WeakMap',
    _WeakSet = 'WeakSet',
    _Null = 'Null',
    _Undefined = 'Undefined';

export const

    /**
     * Returns whether a value is a function or not.
     * @function module:is.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    isFunction = instanceOf(Function),

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
    isType = curry((type, obj) => typeOf(obj) === (isFunction(type) ? type.name : type)),

    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:is.isClass
     * @param value {*}
     * @returns {boolean}
     */
    isClass = value => value && /^\s{0,3}class\s{1,3}/.test(value.toString().substr(0, 10)),

    isCallable = x => !isClass(x) && isFunction(x),

    /**
     * Checks if value is an array.
     * @function module:is.isArray
     * @param value {*}
     * @returns {boolean}
     */
    isArray = isType(Array),

    /**
     * Checks whether value is an object or not.
     * @function module:is.isObject
     * @param value
     * @returns {Boolean}
     */
    isObject = isType(_Object),

    /**
     * Checks if value is a boolean.
     * @function module:is.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    isBoolean = isType(_Boolean),

    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:is.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    isNumber = isType(_Number),

    /**
     * Checks whether value is a string or not.
     * @function module:is.isString
     * @param value {*}
     * @returns {Boolean}
     */
    isString = isType(_String),

    /**
     * Checks whether value is of `Map` or not.
     * @function module:is.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    isMap = isType(_Map),

    /**
     * Checks whether value is of `Set` or not.
     * @function module:is.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    isSet = isType(_Set),

    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:is.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakMap = isType(_WeakMap),

    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:is.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakSet = isType(_WeakSet),

    /**
     * Checks if value is undefined.
     * @function module:is.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    isUndefined = isType(_Undefined),

    /**
     * Checks if value is null.
     * @function module:is.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    isNull = isType(_Null),

    /**
     * Checks if value is a `Symbol`.
     * @function module:is.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    isSymbol = isType('Symbol');
