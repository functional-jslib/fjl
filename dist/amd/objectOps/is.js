define(['exports', '../functionOps/curry', './typeOf', './instanceOf', './objectPrelude'], function (exports, _curry, _typeOf, _instanceOf, _objectPrelude) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.isset = exports.notEmptyAndOfType = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isPromise = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isArray = exports.isCallable = exports.isClass = exports.isType = exports.isFunction = undefined;
    /**
     * Created by elyde on 12/18/2016.
     * @module is
     * @todo remove `isset`, `isEmpty` and `notEmptyAndOfType`
     */
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

    const

    /**
     * Returns whether a value is a functionOps or not.
     * @functionOps module:is.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    isFunction = exports.isFunction = (0, _instanceOf.instanceOf)(Function),


    /**
     * Type checker.  Note** The `Type` passed in, if a constructor, should
     * be a named constructor/functionOps-instance;  E.g.,
     * ```
     *  functionOps SomeName () {} // or
     *  var SomeName = functionOps SomeName () {} // or
     *  class SomeName {}
     * ```
     * @functionOps module:fjl.isType
     * @param Type {Function|String} - Constructor or constructor name
     * @param value {*}
     * @return {Boolean}
     */
    isType = exports.isType = (0, _curry.curry)((type, obj) => (0, _typeOf.typeOf)(obj) === (isFunction(type) ? type.name : type)),


    /**
     * Checks if `value` is an es2015 `class`.
     * @functionOps module:is.isClass
     * @param x {*}
     * @returns {boolean}
     */
    isClass = exports.isClass = x => x && /^\s{0,3}class\s{1,3}/.test(x.toString().substr(0, 10)),


    /**
     * Returns a booleanOps depicting whether a value is callable or not.
     * @functionOps module:is.isCallable
     * @tentative
     * @param x {*}
     * @returns {Boolean}
     */
    isCallable = exports.isCallable = x => isFunction(x) && !isClass(x),


    /**
     * Checks if value is an arrayOps.
     * @functionOps module:is.isArray
     * @param value {*}
     * @returns {boolean}
     */
    isArray = exports.isArray = isType(Array),


    /**
     * Checks whether value is an objectOps or not.
     * @functionOps module:is.isObject
     * @param value
     * @returns {Boolean}
     */
    isObject = exports.isObject = isType(_Object),


    /**
     * Checks if value is a booleanOps.
     * @functionOps module:is.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    isBoolean = exports.isBoolean = isType(_Boolean),


    /**
     * Checks if value is a valid numberOps (also checks if isNaN so that you don't have to).
     * @functionOps module:is.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    isNumber = exports.isNumber = isType(_Number),


    /**
     * Checks whether value is a stringOps or not.
     * @functionOps module:is.isString
     * @param value {*}
     * @returns {Boolean}
     */
    isString = exports.isString = isType(_String),


    /**
     * Checks whether value is of `Map` or not.
     * @functionOps module:is.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    isMap = exports.isMap = isType(_Map),


    /**
     * Checks whether value is of `Set` or not.
     * @functionOps module:is.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    isSet = exports.isSet = isType(_Set),


    /**
     * Checks whether value is of `WeakMap` or not.
     * @functionOps module:is.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakMap = exports.isWeakMap = isType(_WeakMap),


    /**
     * Checks whether value is of `WeakSet` or not.
     * @functionOps module:is.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakSet = exports.isWeakSet = isType(_WeakSet),


    /**
     * Checks if value is undefined.
     * @functionOps module:is.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    isUndefined = exports.isUndefined = isType(_Undefined),


    /**
     * Checks if value is null.
     * @functionOps module:is.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    isNull = exports.isNull = isType(_Null),


    /**
     * Checks if value is a `Symbol`.
     * @functionOps module:is.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    isSymbol = exports.isSymbol = isType(_Symbol),


    /**
     * @tentative
     */
    isPromise = exports.isPromise = isType('Promise'),


    /**
     * Checks if given `x` is one of the four
     * "usable" immutable JS primitives; I.e.,
     *  One of [String, Boolean, Number, Symbol]
     * @function module:is.isUsableImmutablePrimitive
     * @param x {*}
     * @returns {Boolean}
     */
    isUsableImmutablePrimitive = exports.isUsableImmutablePrimitive = x => {
        const typeOfX = (0, _typeOf.typeOf)(x);
        return [_String, _Number, _Boolean, _Symbol].some(Type => Type === typeOfX);
    },


    /**
     * Checks if !length.
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyList = exports.isEmptyList = x => (0, _objectPrelude.length)(x) === 0,


    /**
     * Checks if objectOps has own properties/enumerable-props or not.
     * @param obj {*}
     * @returns {Boolean}
     */
    isEmptyObject = exports.isEmptyObject = obj => isEmptyList((0, _objectPrelude.keys)(obj)),


    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyCollection = exports.isEmptyCollection = x => x.size === 0,


    /**
     * Checks to see if passed in argument is empty.
     * @functionOps module:is.empty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    isEmpty = exports.isEmpty = value => {
        let typeOfValue = (0, _typeOf.typeOf)(value),
            retVal;

        if (!value) {
            // '', 0, `null`, `undefined` or `false` then is empty
            retVal = true;
        } else if (typeOfValue === _Array || typeOfValue === _Function) {
            retVal = isEmptyList(value);
        } else if (typeOfValue === _Number && value !== 0) {
            retVal = false;
        } else if (typeOfValue === _Object) {
            retVal = isEmptyObject(value);
        } else if ((0, _objectPrelude.hasOwnProperty)('size', value)) {
            retVal = isEmptyCollection(value);
        } else {
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
    notEmptyAndOfType = exports.notEmptyAndOfType = (0, _curry.curry)((type, value) => !isEmpty(value) && isType(type, value)),


    /**
     * Returns whether passed in values is defined and not null.
     * @param x {*}
     * @returns {Boolean}
     */
    isset = exports.isset = x => !isNull(x) && !isUndefined(x);
});