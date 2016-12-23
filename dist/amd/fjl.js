define(['exports', './compose', './curry', './subClassOf', './math', './typeOf', './is', './not', './symbols', './functor/Functor', './functor/Bifunctor', './functor/Applicable', './functor/Applicative', './functor/Chainable', './functor/Extendable', './monad/Monad', './monad/Maybe', './monad/Either', './generated/version'], function (exports, _compose, _curry, _subClassOf, _math, _typeOf, _is, _not, _symbols, _Functor, _Bifunctor, _Applicable, _Applicative, _Chainable, _Extendable, _Monad, _Maybe, _Either, _version) {
    /**
     * Created by elyde on 12/6/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _compose2 = _interopRequireDefault(_compose);

    var symbols = _interopRequireWildcard(_symbols);

    var _Functor2 = _interopRequireDefault(_Functor);

    var _Bifunctor2 = _interopRequireDefault(_Bifunctor);

    var _Applicable2 = _interopRequireDefault(_Applicable);

    var _Applicative2 = _interopRequireDefault(_Applicative);

    var _Chainable2 = _interopRequireDefault(_Chainable);

    var _Extendable2 = _interopRequireDefault(_Extendable);

    var _Monad2 = _interopRequireDefault(_Monad);

    var _version2 = _interopRequireDefault(_version);

    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};

            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }

            newObj.default = obj;
            return newObj;
        }
    }

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        compose: _compose2.default,
        curry: _curry.curry,
        curryN: _curry.curryN,
        curry2: _curry.curry2,
        curry3: _curry.curry3,
        curry4: _curry.curry4,
        curry5: _curry.curry5,
        subClassOf: _subClassOf.subClassOf,
        subClassOfMulti: _subClassOf.subClassOfMulti,
        subtractObj: _math.subtractObj,
        isset: _is.isset,
        issetMulti: _is.issetMulti,
        issetAndOfType: _is.issetAndOfType,
        typeOf: _typeOf.typeOf,
        typeOfIs: _typeOf.typeOfIs,
        typeOfIsMulti: _typeOf.typeOfIsMulti,
        isNumber: _is.isNumber,
        isFunction: _is.isFunction,
        isArray: _is.isArray,
        isBoolean: _is.isBoolean,
        isObject: _is.isObject,
        isString: _is.isString,
        isUndefined: _is.isUndefined,
        isNull: _is.isNull,
        isSymbol: _is.isSymbol,
        isEmpty: _is.isEmpty,
        isEmptyMulti: _is.isEmptyMulti,
        isEmptyObj: _is.isEmptyObj,
        notOfTypeOrEmpty: _not.notOfTypeOrEmpty,
        notEmptyAndOfType: _not.notEmptyAndOfType,
        symbols: symbols,
        Functor: _Functor2.default,
        Bifunctor: _Bifunctor2.default,
        Applicable: _Applicable2.default,
        Applicative: _Applicative2.default,
        Chainable: _Chainable2.default,
        Extendable: _Extendable2.default,
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
});