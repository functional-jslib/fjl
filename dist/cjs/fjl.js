/**
 * Created by elyde on 12/6/2016.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _curry = require('./curry');

var _subClass = require('./subClass');

var _typeOf = require('./typeOf');

var _is = require('./is');

var _not = require('./not');

var _Functor = require('./functor/Functor');

var _Functor2 = _interopRequireDefault(_Functor);

var _Bifunctor = require('./functor/Bifunctor');

var _Bifunctor2 = _interopRequireDefault(_Bifunctor);

var _Profunctor = require('./functor/Profunctor');

var _Profunctor2 = _interopRequireDefault(_Profunctor);

var _Apply = require('./functor/Apply');

var _Apply2 = _interopRequireDefault(_Apply);

var _Applicative = require('./functor/Applicative');

var _Applicative2 = _interopRequireDefault(_Applicative);

var _Chain = require('./functor/Chain');

var _Chain2 = _interopRequireDefault(_Chain);

var _Extend = require('./functor/Extend');

var _Extend2 = _interopRequireDefault(_Extend);

var _Comonad = require('./functor/Comonad');

var _Comonad2 = _interopRequireDefault(_Comonad);

var _Monad = require('./monad/Monad');

var _Monad2 = _interopRequireDefault(_Monad);

var _Maybe = require('./monad/Maybe');

var _Either = require('./monad/Either');

var _objCombinators = require('./objCombinators');

var _arrayCombinators = require('./arrayCombinators');

var _version = require('./generated/version');

var _version2 = _interopRequireDefault(_version);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    complement: _objCombinators.complement,
    compose: _compose2.default,
    curry: _curry.curry,
    curryN: _curry.curryN,
    curry2: _curry.curry2,
    curry3: _curry.curry3,
    curry4: _curry.curry4,
    curry5: _curry.curry5,
    subClass: _subClass.subClass,
    subClassMulti: _subClass.subClassMulti,
    difference: _objCombinators.difference,
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
    intersect: _objCombinators.intersect,
    notEmptyAndOfType: _not.notEmptyAndOfType,
    union: _objCombinators.union,
    arrayDifference: _arrayCombinators.difference,
    arrayIntersect: _arrayCombinators.intersect,
    arrayComplement: _arrayCombinators.complement,
    arrayUnion: _arrayCombinators.union,
    Functor: _Functor2.default,
    Bifunctor: _Bifunctor2.default,
    Profunctor: _Profunctor2.default,
    Apply: _Apply2.default,
    Applicative: _Applicative2.default,
    Chain: _Chain2.default,
    Extend: _Extend2.default,
    Comonad: _Comonad2.default,
    Monad: _Monad2.default,
    Maybe: _Maybe.Maybe,
    Just: _Maybe.Just,
    Nothing: _Maybe.Nothing,
    maybe: _Maybe.maybe,
    Either: _Either.Either,
    Left: _Either.Left,
    Right: _Either.Right,
    either: _Either.either,
    version: _version2.default
};