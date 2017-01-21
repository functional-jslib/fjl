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

var _combinators = require('./combinators');

var _objCombinators = require('./objCombinators');

var _arrayCombinators = require('./arrayCombinators');

var _DoublyLinkedList = require('./data/DoublyLinkedList');

var _DoublyLinkedList2 = _interopRequireDefault(_DoublyLinkedList);

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
    DoublyLinkedList: _DoublyLinkedList2.default,
    version: _version2.default
};