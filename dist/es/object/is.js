"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeOf_1 = require("./typeOf");
const object_1 = require("../jsPlatform/object");
const curry_1 = require("../function/curry");
let _String = String.name, _Number = Number.name, _Object = Object.name, _Boolean = Boolean.name, _Symbol = 'Symbol', _Map = 'Map', _Set = 'Set', _WeakMap = 'WeakMap', _WeakSet = 'WeakSet', _Null = 'Null', _Undefined = 'Undefined';
exports.toTypeRef = type => {
    if (!type) {
        return typeOf_1.typeOf(type);
    }
    else if (type.constructor === String || (type instanceof Function)) {
        return type;
    }
    return typeOf_1.typeOf(type);
}, exports.toTypeRefs = (...types) => types.map(exports.toTypeRef), exports.toTypeRefName = Type => {
    const ref = exports.toTypeRef(Type);
    return ref instanceof Function ? ref.name : ref;
}, exports.toTypeRefNames = (...types) => types.map(exports.toTypeRefName), exports.isFunction = object_1.instanceOf(Function), exports.isType = curry_1.curry((type, obj) => typeOf_1.typeOf(obj) === exports.toTypeRefName(type)), exports.isStrictly = exports.isType, exports.isOfType = curry_1.curry((type, x) => exports.isType(type, x) || object_1.instanceOf(type, x)), exports.isLoosely = exports.isOfType, exports.isClass = x => x && /^\s{0,3}class\s{1,3}/.test((x + '').substr(0, 10)), exports.isCallable = x => exports.isFunction(x) && !exports.isClass(x), exports.isArray = Array.isArray, exports.isObject = exports.isType(_Object), exports.isBoolean = exports.isType(_Boolean), exports.isNumber = exports.isType(_Number), exports.isString = exports.isType(_String), exports.isMap = exports.isType(_Map), exports.isSet = exports.isType(_Set), exports.isWeakMap = exports.isType(_WeakMap), exports.isWeakSet = exports.isType(_WeakSet), exports.isUndefined = exports.isType(_Undefined), exports.isNull = exports.isType(_Null), exports.isSymbol = exports.isType(_Symbol), exports.isUsableImmutablePrimitive = x => {
    const typeOfX = typeOf_1.typeOf(x);
    return exports.isset(x) &&
        [_String, _Number, _Boolean, _Symbol]
            .some(Type => Type === typeOfX);
}, exports.isEmptyList = x => !object_1.length(x), exports.isEmptyObject = obj => exports.isEmptyList(object_1.keys(obj)), exports.isEmptyCollection = x => x.size === 0, exports.isEmpty = x => {
    if (!x) {
        return true;
    }
    if (exports.isNumber(x) || exports.isFunction(x)) {
        return false;
    }
    if (exports.isArray(x)) {
        return !x.length;
    }
    if (x.size !== undefined && !object_1.instanceOf(Function, x.size)) {
        return !x.size;
    }
    if (exports.isObject(x)) {
        return !object_1.keys(x).length;
    }
    return false;
}, exports.isset = x => x !== null && x !== undefined, exports.isOneOf = (x, ...types) => {
    const typeName = typeOf_1.typeOf(x);
    return exports.toTypeRefNames(types).some(name => typeName === name);
}, exports.isStrictlyOneOf = exports.isOneOf, exports.isLooselyOneOf = (x, ...types) => types.some(type => exports.isType(type, x) || object_1.instanceOf(x, type)), exports.instanceOfOne = (x, ...types) => types.some(object_1.instanceOf(x)), exports.isFunctor = x => x && x.map && object_1.instanceOf(Function, x.map);
//# sourceMappingURL=is.js.map