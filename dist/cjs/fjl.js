/**
 * Created by elyde on 12/6/2016.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = require('./assign');

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _curry = require('./curry');

var _subClass = require('./subClass');

var _typeOf = require('./typeOf');

var _is = require('./is');

var _not = require('./not');

var _errorIfNotTypeFactory = require('./errorIfNotTypeFactory');

var _errorIfNotTypeFactory2 = _interopRequireDefault(_errorIfNotTypeFactory);

var _combinators = require('./combinators');

var _objCombinators = require('./objCombinators');

var _arrayCombinators = require('./arrayCombinators');

var _version = require('./generated/version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    assign: _assign.assign,
    assignDeep: _assign.assignDeep,
    compose: _compose2.default,
    __: _curry.__,
    curry: _curry.curry,
    curryN: _curry.curryN,
    curry2: _curry.curry2,
    curry3: _curry.curry3,
    curry4: _curry.curry4,
    curry5: _curry.curry5,
    subClass: _subClass.subClass,
    subClassMulti: _subClass.subClassMulti,
    isset: _is.isset,
    issetAndOfType: _is.issetAndOfType,
    typeOf: _typeOf.typeOf,
    typeOfIs: _typeOf.typeOfIs,
    isNumber: _is.isNumber,
    isFunction: _is.isFunction,
    isArray: _is.isArray,
    isBoolean: _is.isBoolean,
    isObject: _is.isObject,
    isString: _is.isString,
    isMap: _is.isMap,
    isSet: _is.isSet,
    isWeakSet: _is.isWeakSet,
    isWeakMap: _is.isWeakMap,
    isUndefined: _is.isUndefined,
    isNull: _is.isNull,
    isSymbol: _is.isSymbol,
    isEmpty: _is.isEmpty,
    isConstructablePrimitive: _is.isConstructablePrimitive,
    notEmptyAndOfType: _not.notEmptyAndOfType,
    errorIfNotTypeFactory: _errorIfNotTypeFactory2.default,
    complement: _combinators.complement,
    difference: _combinators.difference,
    intersect: _combinators.intersect,
    union: _combinators.union,
    objComplement: _objCombinators.complement,
    objDifference: _objCombinators.difference,
    objIntersect: _objCombinators.intersect,
    objUnion: _objCombinators.union,
    arrayDifference: _arrayCombinators.difference,
    arrayIntersect: _arrayCombinators.intersect,
    arrayComplement: _arrayCombinators.complement,
    arrayUnion: _arrayCombinators.union,
    length: _combinators.length,
    version: _version2.default
};