define(['exports', './assign', './compose', './curry', './subClass', './typeOf', './is', './not', './errorIfNotTypeFactory', './fnOperators', './operators', './objOperators', './arrayOperators', './generated/version'], function (exports, _assign, _compose, _curry, _subClass, _typeOf, _is, _not, _errorIfNotTypeFactory, _fnOperators, _operators, _objOperators, _arrayOperators, _version) {
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
        curry__: _curry.curry__,
        curryN__: _curry.curryN__,
        curry2__: _curry.curry2__,
        curry3__: _curry.curry3__,
        curry4__: _curry.curry4__,
        curry5__: _curry.curry5__,
        difference: _operators.difference,
        errorIfNotTypeFactory: _errorIfNotTypeFactory2.default,
        filter: _operators.filter,
        intersect: _operators.intersect,
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
});