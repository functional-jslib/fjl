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

var _operators = require('./operators');

var _objOperators = require('./objOperators');

var _arrayOperators = require('./arrayOperators');

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
    pureCurry: _curry.pureCurry,
    pureCurryN: _curry.pureCurryN,
    pureCurry2: _curry.pureCurry2,
    pureCurry3: _curry.pureCurry3,
    pureCurry4: _curry.pureCurry4,
    pureCurry5: _curry.pureCurry5,
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
    id: _operators.id,
    equals: _operators.equals,
    concat: _operators.concat,
    of: _operators.of,
    empty: _operators.empty,
    zero: _operators.zero,
    ap: _operators.ap,
    alt: _operators.alt,
    map: _operators.map,
    filter: _operators.filter,
    reduce: _operators.reduce,
    reduceRight: _operators.reduceRight,
    join: _operators.join,
    chain: _operators.chain,
    liftN: _operators.liftN,
    extend: _operators.extend,
    extract: _operators.extract,
    promap: _operators.promap,
    bimap: _operators.bimap,
    complement: _operators.complement,
    difference: _operators.difference,
    intersect: _operators.intersect,
    union: _operators.union,
    objComplement: _objOperators.complement,
    objDifference: _objOperators.difference,
    objIntersect: _objOperators.intersect,
    objUnion: _objOperators.union,
    arrayDifference: _arrayOperators.difference,
    arrayIntersect: _arrayOperators.intersect,
    arrayComplement: _arrayOperators.complement,
    arrayUnion: _arrayOperators.union,
    version: _version2.default
};
module.exports = exports['default'];