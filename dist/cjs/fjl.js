/**
 * Created by elyde on 12/6/2016.
 * @todo Evaluate library for places where we can make it more functional; E.g.,
 *  - Make methods take the functor/monad values as last (where it makes sense)
 * @todo Rename curry_ and curry*__ to something easier on the eyes (lol).
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

var _fnOperators = require('./fnOperators');

var _operators = require('./operators');

var _objOperators = require('./objOperators');

var _arrayOperators = require('./arrayOperators');

var _version = require('./generated/version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    __: _curry.__,
    apply: _fnOperators.apply,
    arrayComplement: _arrayOperators.complement,
    arrayDifference: _arrayOperators.difference,
    arrayIntersect: _arrayOperators.intersect,
    arrayUnion: _arrayOperators.union,
    assign: _assign.assign,
    assignDeep: _assign.assignDeep,
    call: _fnOperators.call,
    complement: _operators.complement,
    compose: _compose2.default,
    curry: _curry.curry,
    curryN: _curry.curryN,
    curry2: _curry.curry2,
    curry3: _curry.curry3,
    curry4: _curry.curry4,
    curry5: _curry.curry5,
    curry_: _curry.curry_,
    curryN_: _curry.curryN_,
    curry2_: _curry.curry2_,
    curry3_: _curry.curry3_,
    curry4_: _curry.curry4_,
    curry5_: _curry.curry5_,
    difference: _operators.difference,
    errorIfNotTypeFactory: _errorIfNotTypeFactory2.default,
    filter: _operators.filter,
    flatten: _arrayOperators.flatten,
    flattenMulti: _arrayOperators.flattenMulti,
    intersect: _operators.intersect,
    instanceOf: _is.instanceOf,
    isset: _is.isset,
    issetAndOfType: _is.issetAndOfType,
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
    map: _operators.map,
    notEmptyAndOfType: _not.notEmptyAndOfType,
    objComplement: _objOperators.complement,
    objDifference: _objOperators.difference,
    objIntersect: _objOperators.intersect,
    objUnion: _objOperators.union,
    reduce: _operators.reduce,
    reduceRight: _operators.reduceRight,
    subClass: _subClass.subClass,
    subClassMulti: _subClass.subClassMulti,
    typeOf: _typeOf.typeOf,
    typeOfIs: _typeOf.typeOfIs,
    union: _operators.union,
    version: _version2.default
};
module.exports = exports['default'];