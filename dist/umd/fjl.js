(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', './assign', './compose', './curry', './typeOf', './is', './functionOps', './objectOps', './arrayOps', './operators', './stringOps', './generated/version'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('./assign'), require('./compose'), require('./curry'), require('./typeOf'), require('./is'), require('./functionOps'), require('./objectOps'), require('./arrayOps'), require('./operators'), require('./stringOps'), require('./generated/version'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.assign, global.compose, global.curry, global.typeOf, global.is, global.functionOps, global.objectOps, global.arrayOps, global.operators, global.stringOps, global.version);
        global.fjl = mod.exports;
    }
})(this, function (module, exports, _assign, _compose, _curry, _typeOf, _is, _functionOps, _objectOps, _arrayOps, _operators, _stringOps, _version) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _compose2 = _interopRequireDefault(_compose);

    var _version2 = _interopRequireDefault(_version);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    exports.default = {
        __: _curry.__,
        apply: _functionOps.apply,
        arrayComplement: _arrayOps.complement,
        arrayDifference: _arrayOps.difference,
        arrayIntersect: _arrayOps.intersect,
        arrayUnion: _arrayOps.union,
        assign: _assign.assign,
        assignDeep: _assign.assignDeep,
        call: _functionOps.call,
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
        filter: _arrayOps.filter,
        flatten: _arrayOps.flatten,
        flattenMulti: _arrayOps.flattenMulti,
        head: _arrayOps.head,
        init: _arrayOps.init,
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
        last: _arrayOps.last,
        map: _arrayOps.map,
        notEmptyAndOfType: _is.notEmptyAndOfType,
        objComplement: _objectOps.complement,
        objDifference: _objectOps.difference,
        objIntersect: _objectOps.intersect,
        objUnion: _objectOps.union,
        reduce: _arrayOps.reduce,
        reduceRight: _arrayOps.reduceRight,
        reverse: _arrayOps.reverse,
        tail: _arrayOps.tail,
        typeOf: _typeOf.typeOf,
        typeOfIs: _typeOf.typeOfIs,
        union: _operators.union,
        join: _arrayOps.join, split: _stringOps.split, lines: _stringOps.lines, words: _stringOps.words, unlines: _stringOps.unlines, unwords: _stringOps.unwords,
        orderedLengths: _arrayOps.orderedLengths, zip: _arrayOps.zip, zipN: _arrayOps.zipN, unzip: _arrayOps.unzip, unzipN: _arrayOps.unzipN,
        getSortByOrder: _arrayOps.getSortByOrder, sortAsc: _arrayOps.sortAsc, sortDesc: _arrayOps.sortDesc, sortDescByLength: _arrayOps.sortDescByLength, concat: _arrayOps.concat,
        ASC: _arrayOps.ASC, DESC: _arrayOps.DESC,
        lengths: _arrayOps.lengths,
        version: _version2.default
    };
    module.exports = exports['default'];
});