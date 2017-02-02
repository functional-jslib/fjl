(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './assign', './compose', './curry', './subClass', './typeOf', './is', './not', './errorIfNotTypeFactory', './combinators', './objCombinators', './arrayCombinators', './generated/version'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./assign'), require('./compose'), require('./curry'), require('./subClass'), require('./typeOf'), require('./is'), require('./not'), require('./errorIfNotTypeFactory'), require('./combinators'), require('./objCombinators'), require('./arrayCombinators'), require('./generated/version'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.assign, global.compose, global.curry, global.subClass, global.typeOf, global.is, global.not, global.errorIfNotTypeFactory, global.combinators, global.objCombinators, global.arrayCombinators, global.version);
        global.fjl = mod.exports;
    }
})(this, function (exports, _assign, _compose, _curry, _subClass, _typeOf, _is, _not, _errorIfNotTypeFactory, _combinators, _objCombinators, _arrayCombinators, _version) {
    /**
     * Created by elyde on 12/6/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _compose2 = _interopRequireDefault(_compose);

    var _errorIfNotTypeFactory2 = _interopRequireDefault(_errorIfNotTypeFactory);

    var _version2 = _interopRequireDefault(_version);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

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
});