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
        alt: _operators.alt,
        ap: _operators.ap,
        apply: _fnOperators.apply,
        arrayComplement: _arrayOperators.complement,
        arrayDifference: _arrayOperators.difference,
        arrayIntersect: _arrayOperators.intersect,
        arrayUnion: _arrayOperators.union,
        assign: _assign.assign,
        assignDeep: _assign.assignDeep,
        bimap: _operators.bimap,
        call: _fnOperators.call,
        chain: _operators.chain,
        complement: _operators.complement,
        compose: _compose2.default,
        concat: _operators.concat,
        curry: _curry.curry,
        curryN: _curry.curryN,
        curry2: _curry.curry2,
        curry3: _curry.curry3,
        curry4: _curry.curry4,
        curry5: _curry.curry5,
        difference: _operators.difference,
        empty: _operators.empty,
        errorIfNotTypeFactory: _errorIfNotTypeFactory2.default,
        equals: _operators.equals,
        extend: _operators.extend,
        extract: _operators.extract,
        filter: _operators.filter,
        id: _operators.id,
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
        join: _operators.join,
        liftN: _operators.liftN,
        map: _operators.map,
        notEmptyAndOfType: _not.notEmptyAndOfType,
        pureCurry: _curry.pureCurry,
        pureCurryN: _curry.pureCurryN,
        pureCurry2: _curry.pureCurry2,
        pureCurry3: _curry.pureCurry3,
        pureCurry4: _curry.pureCurry4,
        pureCurry5: _curry.pureCurry5,
        objComplement: _objOperators.complement,
        objDifference: _objOperators.difference,
        objIntersect: _objOperators.intersect,
        objUnion: _objOperators.union,
        of: _operators.of,
        promap: _operators.promap,
        reduce: _operators.reduce,
        reduceRight: _operators.reduceRight,
        subClass: _subClass.subClass,
        subClassMulti: _subClass.subClassMulti,
        typeOf: _typeOf.typeOf,
        typeOfIs: _typeOf.typeOfIs,
        union: _operators.union,
        version: _version2.default,
        zero: _operators.zero
    };
});