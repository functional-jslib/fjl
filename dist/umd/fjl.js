(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './compose', './curry', './subClass', './objOperators', './typeOf', './is', './not', './functor/Functor', './functor/Bifunctor', './functor/Apply', './functor/Applicative', './functor/Chain', './functor/Extend', './monad/Monad', './monad/Maybe', './monad/Either', './generated/version'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./compose'), require('./curry'), require('./subClass'), require('./objOperators'), require('./typeOf'), require('./is'), require('./not'), require('./functor/Functor'), require('./functor/Bifunctor'), require('./functor/Apply'), require('./functor/Applicative'), require('./functor/Chain'), require('./functor/Extend'), require('./monad/Monad'), require('./monad/Maybe'), require('./monad/Either'), require('./generated/version'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.compose, global.curry, global.subClass, global.objOperators, global.typeOf, global.is, global.not, global.Functor, global.Bifunctor, global.Apply, global.Applicative, global.Chain, global.Extend, global.Monad, global.Maybe, global.Either, global.version);
        global.fjl = mod.exports;
    }
})(this, function (exports, _compose, _curry, _subClass, _objOperators, _typeOf, _is, _not, _Functor, _Bifunctor, _Apply, _Applicative, _Chain, _Extend, _Monad, _Maybe, _Either, _version) {
    /**
     * Created by elyde on 12/6/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _compose2 = _interopRequireDefault(_compose);

    var _Functor2 = _interopRequireDefault(_Functor);

    var _Bifunctor2 = _interopRequireDefault(_Bifunctor);

    var _Apply2 = _interopRequireDefault(_Apply);

    var _Applicative2 = _interopRequireDefault(_Applicative);

    var _Chain2 = _interopRequireDefault(_Chain);

    var _Extend2 = _interopRequireDefault(_Extend);

    var _Monad2 = _interopRequireDefault(_Monad);

    var _version2 = _interopRequireDefault(_version);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        complement: _objOperators.complement,
        compose: _compose2.default,
        curry: _curry.curry,
        curryN: _curry.curryN,
        curry2: _curry.curry2,
        curry3: _curry.curry3,
        curry4: _curry.curry4,
        curry5: _curry.curry5,
        subClass: _subClass.subClass,
        subClassMulti: _subClass.subClassMulti,
        difference: _objOperators.difference,
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
        intersect: _objOperators.intersect,
        notOfTypeOrEmpty: _not.notOfTypeOrEmpty,
        notEmptyAndOfType: _not.notEmptyAndOfType,
        union: _objOperators.union,
        Functor: _Functor2.default,
        Bifunctor: _Bifunctor2.default,
        Apply: _Apply2.default,
        Applicative: _Applicative2.default,
        Chain: _Chain2.default,
        Extend: _Extend2.default,
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