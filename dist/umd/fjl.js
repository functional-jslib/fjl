(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './compose', './curry', './subClass', './math', './typeOf', './is', './not', './symbols', './functor/Functor', './functor/Bifunctor', './functor/Applicable', './functor/Applicative', './functor/Chainable', './monad/Monad', './monad/Maybe', './monad/Either', './generated/version'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./compose'), require('./curry'), require('./subClass'), require('./math'), require('./typeOf'), require('./is'), require('./not'), require('./symbols'), require('./functor/Functor'), require('./functor/Bifunctor'), require('./functor/Applicable'), require('./functor/Applicative'), require('./functor/Chainable'), require('./monad/Monad'), require('./monad/Maybe'), require('./monad/Either'), require('./generated/version'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.compose, global.curry, global.subClass, global.math, global.typeOf, global.is, global.not, global.symbols, global.Functor, global.Bifunctor, global.Applicable, global.Applicative, global.Chainable, global.Monad, global.Maybe, global.Either, global.version);
        global.fjl = mod.exports;
    }
})(this, function (exports, _compose, _curry, _subClass, _math, _typeOf, _is, _not, _symbols, _Functor, _Bifunctor, _Applicable, _Applicative, _Chainable, _Monad, _Maybe, _Either, _version) {
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

    var _Monad2 = _interopRequireDefault(_Monad);

    var _Either2 = _interopRequireDefault(_Either);

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
        subClass: _subClass.subClass,
        subClassMulti: _subClass.subClassMulti,
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
        Monad: _Monad2.default,
        Maybe: _Maybe.Maybe,
        Just: _Maybe.Just,
        Nothing: _Maybe.Nothing,
        maybe: _Maybe.maybe,
        Either: _Either2.default,
        version: _version2.default
    };
});