(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', './assign', './compose', './curry', './typeOf', './is', './errorIfNotTypeFactory', './fnOperators', './operators', './objOperators', './arrayOperators', './generated/version'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./assign'), require('./compose'), require('./curry'), require('./typeOf'), require('./is'), require('./errorIfNotTypeFactory'), require('./fnOperators'), require('./operators'), require('./objOperators'), require('./arrayOperators'), require('./generated/version'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.assign, global.compose, global.curry, global.typeOf, global.is, global.errorIfNotTypeFactory, global.fnOperators, global.operators, global.objOperators, global.arrayOperators, global.version);
        global.fjl = mod.exports;
    }
})(this, function (module, exports, _assign, _compose, _curry, _typeOf, _is, _errorIfNotTypeFactory, _fnOperators, _operators, _objOperators, _arrayOperators, _version) {
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
        notEmptyAndOfType: _is.notEmptyAndOfType,
        objComplement: _objOperators.complement,
        objDifference: _objOperators.difference,
        objIntersect: _objOperators.intersect,
        objUnion: _objOperators.union,
        reduce: _operators.reduce,
        reduceRight: _operators.reduceRight,
        // subClass,
        // subClassMulti,
        typeOf: _typeOf.typeOf,
        typeOfIs: _typeOf.typeOfIs,
        union: _operators.union,
        version: _version2.default
    };
    module.exports = exports['default'];
});