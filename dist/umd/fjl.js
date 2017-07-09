(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', './assign', './compose', './curry', './typeOf', './is', './errorIfNotTypeFactory', './fnOperators', './objOperators', './arrayOperators', './operators', './stringOps', './generated/version'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./assign'), require('./compose'), require('./curry'), require('./typeOf'), require('./is'), require('./errorIfNotTypeFactory'), require('./fnOperators'), require('./objOperators'), require('./arrayOperators'), require('./operators'), require('./stringOps'), require('./generated/version'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.assign, global.compose, global.curry, global.typeOf, global.is, global.errorIfNotTypeFactory, global.fnOperators, global.objOperators, global.arrayOperators, global.operators, global.stringOps, global.version);
        global.fjl = mod.exports;
    }
})(this, function (module, exports, _assign, _compose, _curry, _typeOf, _is, _errorIfNotTypeFactory, _fnOperators, _objOperators, _arrayOperators, _operators, _stringOps, _version) {
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

    /**
     * Fjl
     * @module fjl
     * @type {{__: PlaceHolder, apply: apply, arrayComplement, arrayDifference, arrayIntersect, arrayUnion, assign: assign, assignDeep: assignDeep, call: call, complement: Function, compose: compose, curry: curry, curryN: curryN, curry2: curry2, curry3: curry3, curry4: curry4, curry5: curry5, curry_: curry_, curryN_: curryN_, curry2_: curry2_, curry3_: curry3_, curry4_: curry4_, curry5_: curry5_, difference: Function, errorIfNotTypeFactory: errorIfNotTypeFactory, filter, flatten: module:fjl.flatten, flattenMulti, head: module:fjl.head, init: module:fjl.init, intersect: Function, instanceOf: Function, isset: module:fjl.isset, issetAndOfType: module:fjl.issetAndOfType, isNumber: module:fjl.isNumber, isFunction: module:fjl.isFunction, isArray: module:fjl.isArray, isBoolean: module:fjl.isBoolean, isObject: module:fjl.isObject, isString: module:fjl.isString, isMap: module:fjl.isMap, isSet: module:fjl.isSet, isWeakSet: module:fjl.isWeakSet, isWeakMap: module:fjl.isWeakMap, isUndefined: module:fjl.isUndefined, isNull: module:fjl.isNull, isSymbol: module:fjl.isSymbol, isEmpty: module:fjl.isEmpty, isConstructablePrimitive: isConstructablePrimitive, last: module:fjl.last, map, notEmptyAndOfType: module:fjl.notEmptyAndOfType, objComplement: Function, objDifference: Function, objIntersect: Function, objUnion: Function, reduce, reduceRight, reverse, tail: module:fjl.tail, typeOf: module:fjl.typeOf, typeOfIs: Function, union: Function, version: string}}
     */
    /**
     * Created by elyde on 12/6/2016.
     * @todo Evaluate library for places where we can make it more functional; E.g.,
     *  - Make methods take the functor/monad values as last (where it makes sense)
     */

    var fjl = {
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
        filter: _arrayOperators.filter,
        flatten: _arrayOperators.flatten,
        flattenMulti: _arrayOperators.flattenMulti,
        head: _arrayOperators.head,
        init: _arrayOperators.init,
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
        last: _arrayOperators.last,
        map: _arrayOperators.map,
        notEmptyAndOfType: _is.notEmptyAndOfType,
        objComplement: _objOperators.complement,
        objDifference: _objOperators.difference,
        objIntersect: _objOperators.intersect,
        objUnion: _objOperators.union,
        reduce: _arrayOperators.reduce,
        reduceRight: _arrayOperators.reduceRight,
        reverse: _arrayOperators.reverse,
        tail: _arrayOperators.tail,
        typeOf: _typeOf.typeOf,
        typeOfIs: _typeOf.typeOfIs,
        union: _operators.union,
        join: _stringOps.join, split: _stringOps.split, lines: _stringOps.lines, words: _stringOps.words, unlines: _stringOps.unlines, unwords: _stringOps.unwords,
        version: _version2.default
    };

    exports.default = fjl;
    module.exports = exports['default'];
});