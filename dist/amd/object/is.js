define(['exports', './typeOf', '../jsPlatform/object', '../function/curry'], function (exports, _typeOf, _object, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.isset = exports.isEmpty = exports.isEmptyCollection = exports.isEmptyObject = exports.isEmptyList = exports.isUsableImmutablePrimitive = exports.isSymbol = exports.isNull = exports.isUndefined = exports.isWeakSet = exports.isWeakMap = exports.isSet = exports.isMap = exports.isString = exports.isNumber = exports.isBoolean = exports.isObject = exports.isArray = exports.isCallable = exports.isClass = exports.isOfType = exports.isType = exports.isFunction = exports.toTypeRefName = exports.toTypeRef = undefined;


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
        _Undefined = 'Undefined'; /**
                                   * Created by elyde on 12/18/2016.
                                   * @memberOf object
                                   */

    const

    /**
     * Resolves/normalizes a type name from either a string or a constructor.
     * @function module:object.toTypeRef
     * @param type {Function|String} - String or function representing a type.
     * @returns {String}
     * @private
     */
    toTypeRef = exports.toTypeRef = type => {
        if (!type) {
            return (0, _typeOf.typeOf)(type);
        } else if (type.constructor === String || type instanceof Function) {
            return type;
        }
        return (0, _typeOf.typeOf)(type);
    },
          toTypeRefName = exports.toTypeRefName = Type => {
        const ref = toTypeRef(Type);
        return ref instanceof Function ? ref.name : ref;
    },


    /**
     * Returns whether a value is a function or not.
     * @function module:object.isFunction
     * @param value {*}
     * @returns {Boolean}
     */
    isFunction = exports.isFunction = (0, _object.instanceOf)(Function),


    /**
     * Strict type checker.  Checks if given value is a direct instance of given type;  E.g.,
     * @example
     *   isType(String, 'abcdefg')  === true // true
     *   isType(String.name, 'abcdefg') === true
     *   isType(Number, NaN) === false
     *   isType(Number, 99) === true
     *   isType('Null', 99) === false // though, for `null` and `undefined` checks
     *                                // @see `isset`, in this module, instead
     *   isType('Undefined', undefined) === true // true
     *
     * @note Useful where absolute types, or some semblance thereof, are required.
     * @function module:object.isType
     * @param type {Function|ObjectConstructor|String} - Constructor or constructor name
     * @param obj {*}
     * @return {Boolean}
     */
    isType = exports.isType = (0, _curry.curry)((type, obj) => (0, _typeOf.typeOf)(obj) === toTypeRefName(type)),


    /**
     * Loose type checker;  E.g., If `type` is not a constructor, but a constructor name, does a type check on
     * constructor names, else if first check fails and `type` is a constructor, performs an `instanceof` check
     * on value with constructor.
     * @note Use care when checking for `Array` and/or `Object` since the both are considered objects by `instanceof` checker.
     * @note For `null` and `undefined` their class cased names can be used for type checks
     * `isOfType('Null', null) === true (passes strict type check)` (or better yet `isset` can be used).
     * @throwsafe - Doesn't throw on `null` or `undefined` `obj` values.
     * @example
     * isOfType(Number, 99) === true        // true  (passes strict type check (numbers are not instances of `Number`
     *                                      //        constructor)
     * isOfType('Number', 99) === true      // true  (passes strict type check)
     * isOfType(Number, NaN) === true       // true. (passes instance of check)
     *                                      //        If you want "true" strict type checking use `isType`
     * isOfType(Object, []) === true        // true  (passes instance of check)
     * isOfType(Array, []) === true         // true  (passes instance of check)
     * isOfType(Object, {}) === true        // true  (passes instance of check)
     * isOfType(Object.name, {}) === true   // true  (Passes strict type check)
     * class Abc extends String {}
     * isOfType(String, new Abc('abcd')) // true (passes instanceof check)
     *
     * @function module:is.isOfType
     * @param type {Function|String} - Type reference (constructor or `constructor.name`).
     * @param x {*} - Value to check.
     * @returns {Boolean}
     */
    isOfType = exports.isOfType = (0, _curry.curry)((type, x) => isType(type, x) || (0, _object.instanceOf)(type, x)),


    /**
     * Checks if `value` is an es2015 `class`.
     * @function module:object.isClass
     * @param x {*}
     * @returns {boolean}
     */
    isClass = exports.isClass = x => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10)),


    /**
     * Returns a boolean depicting whether a value is callable or not.
     * @function module:object.isCallable
     * @tentative
     * @param x {*}
     * @returns {Boolean}
     */
    isCallable = exports.isCallable = x => isFunction(x) && !isClass(x),


    /**
     * Checks if value is an array (same as `Array.isArray`).
     * @function module:object.isArray
     * @param value {*}
     * @returns {boolean}
     */
    { isArray } = Array,


    /**
     * Checks whether value is an object or not.
     * @function module:object.isObject
     * @param value
     * @returns {Boolean}
     */
    isObject = exports.isObject = isType(_Object),


    /**
     * Checks if value is a boolean.
     * @function module:object.isBoolean
     * @param value {*}
     * @returns {Boolean}
     */
    isBoolean = exports.isBoolean = isType(_Boolean),


    /**
     * Checks if value is a valid number (also checks if isNaN so that you don't have to).
     * @function module:object.isNumber
     * @param value {*}
     * @returns {Boolean}
     */
    isNumber = exports.isNumber = isType(_Number),


    /**
     * Checks whether value is a string or not.
     * @function module:object.isString
     * @param value {*}
     * @returns {Boolean}
     */
    isString = exports.isString = isType(_String),


    /**
     * Checks whether value is of `Map` or not.
     * @function module:object.isMap
     * @param value {*}
     * @returns {Boolean}
     */
    isMap = exports.isMap = isType(_Map),


    /**
     * Checks whether value is of `Set` or not.
     * @function module:object.isSet
     * @param value {*}
     * @returns {Boolean}
     */
    isSet = exports.isSet = isType(_Set),


    /**
     * Checks whether value is of `WeakMap` or not.
     * @function module:object.isWeakMap
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakMap = exports.isWeakMap = isType(_WeakMap),


    /**
     * Checks whether value is of `WeakSet` or not.
     * @function module:object.isWeakSet
     * @param value {*}
     * @returns {Boolean}
     */
    isWeakSet = exports.isWeakSet = isType(_WeakSet),


    /**
     * Checks if value is undefined.
     * @function module:object.isUndefined
     * @param value {*}
     * @returns {Boolean}
     */
    isUndefined = exports.isUndefined = isType(_Undefined),


    /**
     * Checks if value is null.
     * @function module:object.isNull
     * @param value {*}
     * @returns {Boolean}
     */
    isNull = exports.isNull = isType(_Null),


    /**
     * Checks if value is a `Symbol`.
     * @function module:object.isSymbol
     * @param value {*}
     * @returns {Boolean}
     */
    isSymbol = exports.isSymbol = isType(_Symbol),


    /**
     * Checks if given `x` is set and of one of
     *  [String, Boolean, Number, Symbol] (null and undefined are immutable
     *  but are not "usable" (usually not what we want to operate on).
     * @function module:object.isUsableImmutablePrimitive
     * @param x {*}
     * @returns {Boolean}
     */
    isUsableImmutablePrimitive = exports.isUsableImmutablePrimitive = x => {
        const typeOfX = (0, _typeOf.typeOf)(x);
        return isset(x) && [_String, _Number, _Boolean, _Symbol].some(Type => Type === typeOfX);
    },


    /**
     * Checks if !length.
     * @function module:object.isEmptyList
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyList = exports.isEmptyList = x => !(0, _object.length)(x),


    /**
     * Checks if object has own properties/enumerable-props or not.
     * @function module:object.isEmptyObject
     * @param obj {*}
     * @returns {Boolean}
     */
    isEmptyObject = exports.isEmptyObject = obj => isEmptyList((0, _object.keys)(obj)),


    /**
     * Checks if collection is empty or not (Map, WeakMap, WeakSet, Set etc.).
     * @function module:object.isEmptyCollection
     * @param x {*}
     * @returns {Boolean}
     */
    isEmptyCollection = exports.isEmptyCollection = x => x.size === 0,


    /**
     * Checks to see if passed in value is empty;  I.e.,
     *  check for one of '', 0, `null`, `undefined`, `false`, empty array, empty object, empty function (zero arity),
     *  or empty collection (es6 Map, Set, WeakMap, or WeakSet etc. (`!value.size`);
     * @function module:object.isEmpty
     * @param value {*} - Value to check.
     * @returns {Boolean}
     */
    isEmpty = exports.isEmpty = value => {
        let retVal;
        if (!value) {
            // if '', 0, `null`, `undefined`, or `false` then is empty
            retVal = true;
        }
        const typeOfValue = (0, _typeOf.typeOf)(value);
        if (typeOfValue === _Array || typeOfValue === _Function) {
            retVal = isEmptyList(value);
        } else if (typeOfValue === _Number) {
            retVal = false;
        } else if (typeOfValue === _Object) {
            retVal = isEmptyObject(value);
        } else if ((0, _object.hasOwnProperty)('size', value) && isNumber(value.size)) {
            retVal = isEmptyCollection(value);
        } else {
            retVal = !value;
        }
        return retVal;
    },


    /**
     * Returns whether passed in values is defined and not null or not.
     * @function module:object.isset
     * @param x {*}
     * @returns {Boolean}
     */
    isset = exports.isset = x => x !== null && x !== undefined;
    exports.isArray = isArray;
});