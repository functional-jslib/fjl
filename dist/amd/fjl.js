define(['exports', './assign', './compose', './curry', './typeOf', './is', './functionOps', './objectOps', './arrayOps', './operators', './stringOps', './generated/version'], function (exports, _assign, _compose, _curry, _typeOf, _is, _functionOps, _objectOps, _arrayOps, _operators, _stringOps, _version) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    Object.defineProperty(exports, 'assign', {
        enumerable: true,
        get: function () {
            return _assign.assign;
        }
    });
    Object.defineProperty(exports, 'assignDeep', {
        enumerable: true,
        get: function () {
            return _assign.assignDeep;
        }
    });
    Object.defineProperty(exports, 'compose', {
        enumerable: true,
        get: function () {
            return _compose.compose;
        }
    });
    Object.defineProperty(exports, '__', {
        enumerable: true,
        get: function () {
            return _curry.__;
        }
    });
    Object.defineProperty(exports, 'curry', {
        enumerable: true,
        get: function () {
            return _curry.curry;
        }
    });
    Object.defineProperty(exports, 'curryN', {
        enumerable: true,
        get: function () {
            return _curry.curryN;
        }
    });
    Object.defineProperty(exports, 'curry2', {
        enumerable: true,
        get: function () {
            return _curry.curry2;
        }
    });
    Object.defineProperty(exports, 'curry3', {
        enumerable: true,
        get: function () {
            return _curry.curry3;
        }
    });
    Object.defineProperty(exports, 'curry4', {
        enumerable: true,
        get: function () {
            return _curry.curry4;
        }
    });
    Object.defineProperty(exports, 'curry5', {
        enumerable: true,
        get: function () {
            return _curry.curry5;
        }
    });
    Object.defineProperty(exports, 'curry_', {
        enumerable: true,
        get: function () {
            return _curry.curry_;
        }
    });
    Object.defineProperty(exports, 'curryN_', {
        enumerable: true,
        get: function () {
            return _curry.curryN_;
        }
    });
    Object.defineProperty(exports, 'curry2_', {
        enumerable: true,
        get: function () {
            return _curry.curry2_;
        }
    });
    Object.defineProperty(exports, 'curry3_', {
        enumerable: true,
        get: function () {
            return _curry.curry3_;
        }
    });
    Object.defineProperty(exports, 'curry4_', {
        enumerable: true,
        get: function () {
            return _curry.curry4_;
        }
    });
    Object.defineProperty(exports, 'curry5_', {
        enumerable: true,
        get: function () {
            return _curry.curry5_;
        }
    });
    Object.defineProperty(exports, 'typeOf', {
        enumerable: true,
        get: function () {
            return _typeOf.typeOf;
        }
    });
    Object.defineProperty(exports, 'typeOfIs', {
        enumerable: true,
        get: function () {
            return _typeOf.typeOfIs;
        }
    });
    Object.defineProperty(exports, 'instanceOf', {
        enumerable: true,
        get: function () {
            return _is.instanceOf;
        }
    });
    Object.defineProperty(exports, 'isset', {
        enumerable: true,
        get: function () {
            return _is.isset;
        }
    });
    Object.defineProperty(exports, 'issetAndOfType', {
        enumerable: true,
        get: function () {
            return _is.issetAndOfType;
        }
    });
    Object.defineProperty(exports, 'isNumber', {
        enumerable: true,
        get: function () {
            return _is.isNumber;
        }
    });
    Object.defineProperty(exports, 'isFunction', {
        enumerable: true,
        get: function () {
            return _is.isFunction;
        }
    });
    Object.defineProperty(exports, 'isArray', {
        enumerable: true,
        get: function () {
            return _is.isArray;
        }
    });
    Object.defineProperty(exports, 'isBoolean', {
        enumerable: true,
        get: function () {
            return _is.isBoolean;
        }
    });
    Object.defineProperty(exports, 'isObject', {
        enumerable: true,
        get: function () {
            return _is.isObject;
        }
    });
    Object.defineProperty(exports, 'isString', {
        enumerable: true,
        get: function () {
            return _is.isString;
        }
    });
    Object.defineProperty(exports, 'isUndefined', {
        enumerable: true,
        get: function () {
            return _is.isUndefined;
        }
    });
    Object.defineProperty(exports, 'isNull', {
        enumerable: true,
        get: function () {
            return _is.isNull;
        }
    });
    Object.defineProperty(exports, 'isSymbol', {
        enumerable: true,
        get: function () {
            return _is.isSymbol;
        }
    });
    Object.defineProperty(exports, 'isEmpty', {
        enumerable: true,
        get: function () {
            return _is.isEmpty;
        }
    });
    Object.defineProperty(exports, 'isMap', {
        enumerable: true,
        get: function () {
            return _is.isMap;
        }
    });
    Object.defineProperty(exports, 'isSet', {
        enumerable: true,
        get: function () {
            return _is.isSet;
        }
    });
    Object.defineProperty(exports, 'isWeakMap', {
        enumerable: true,
        get: function () {
            return _is.isWeakMap;
        }
    });
    Object.defineProperty(exports, 'isWeakSet', {
        enumerable: true,
        get: function () {
            return _is.isWeakSet;
        }
    });
    Object.defineProperty(exports, 'isConstructablePrimitive', {
        enumerable: true,
        get: function () {
            return _is.isConstructablePrimitive;
        }
    });
    Object.defineProperty(exports, 'notEmptyAndOfType', {
        enumerable: true,
        get: function () {
            return _is.notEmptyAndOfType;
        }
    });
    Object.defineProperty(exports, 'call', {
        enumerable: true,
        get: function () {
            return _functionOps.call;
        }
    });
    Object.defineProperty(exports, 'apply', {
        enumerable: true,
        get: function () {
            return _functionOps.apply;
        }
    });
    Object.defineProperty(exports, 'objComplement', {
        enumerable: true,
        get: function () {
            return _objectOps.complement;
        }
    });
    Object.defineProperty(exports, 'objDifference', {
        enumerable: true,
        get: function () {
            return _objectOps.difference;
        }
    });
    Object.defineProperty(exports, 'objUnion', {
        enumerable: true,
        get: function () {
            return _objectOps.union;
        }
    });
    Object.defineProperty(exports, 'objIntersect', {
        enumerable: true,
        get: function () {
            return _objectOps.intersect;
        }
    });
    Object.defineProperty(exports, 'arrayComplement', {
        enumerable: true,
        get: function () {
            return _arrayOps.complement;
        }
    });
    Object.defineProperty(exports, 'arrayDifference', {
        enumerable: true,
        get: function () {
            return _arrayOps.difference;
        }
    });
    Object.defineProperty(exports, 'arrayUnion', {
        enumerable: true,
        get: function () {
            return _arrayOps.union;
        }
    });
    Object.defineProperty(exports, 'arrayIntersect', {
        enumerable: true,
        get: function () {
            return _arrayOps.intersect;
        }
    });
    Object.defineProperty(exports, 'flatten', {
        enumerable: true,
        get: function () {
            return _arrayOps.flatten;
        }
    });
    Object.defineProperty(exports, 'flattenMulti', {
        enumerable: true,
        get: function () {
            return _arrayOps.flattenMulti;
        }
    });
    Object.defineProperty(exports, 'map', {
        enumerable: true,
        get: function () {
            return _arrayOps.map;
        }
    });
    Object.defineProperty(exports, 'filter', {
        enumerable: true,
        get: function () {
            return _arrayOps.filter;
        }
    });
    Object.defineProperty(exports, 'reduce', {
        enumerable: true,
        get: function () {
            return _arrayOps.reduce;
        }
    });
    Object.defineProperty(exports, 'reduceRight', {
        enumerable: true,
        get: function () {
            return _arrayOps.reduceRight;
        }
    });
    Object.defineProperty(exports, 'head', {
        enumerable: true,
        get: function () {
            return _arrayOps.head;
        }
    });
    Object.defineProperty(exports, 'tail', {
        enumerable: true,
        get: function () {
            return _arrayOps.tail;
        }
    });
    Object.defineProperty(exports, 'init', {
        enumerable: true,
        get: function () {
            return _arrayOps.init;
        }
    });
    Object.defineProperty(exports, 'last', {
        enumerable: true,
        get: function () {
            return _arrayOps.last;
        }
    });
    Object.defineProperty(exports, 'reverse', {
        enumerable: true,
        get: function () {
            return _arrayOps.reverse;
        }
    });
    Object.defineProperty(exports, 'orderedLengths', {
        enumerable: true,
        get: function () {
            return _arrayOps.orderedLengths;
        }
    });
    Object.defineProperty(exports, 'lengths', {
        enumerable: true,
        get: function () {
            return _arrayOps.lengths;
        }
    });
    Object.defineProperty(exports, 'zip', {
        enumerable: true,
        get: function () {
            return _arrayOps.zip;
        }
    });
    Object.defineProperty(exports, 'zipN', {
        enumerable: true,
        get: function () {
            return _arrayOps.zipN;
        }
    });
    Object.defineProperty(exports, 'getSortByOrder', {
        enumerable: true,
        get: function () {
            return _arrayOps.getSortByOrder;
        }
    });
    Object.defineProperty(exports, 'sortAsc', {
        enumerable: true,
        get: function () {
            return _arrayOps.sortAsc;
        }
    });
    Object.defineProperty(exports, 'sortDesc', {
        enumerable: true,
        get: function () {
            return _arrayOps.sortDesc;
        }
    });
    Object.defineProperty(exports, 'sortDescByLength', {
        enumerable: true,
        get: function () {
            return _arrayOps.sortDescByLength;
        }
    });
    Object.defineProperty(exports, 'concat', {
        enumerable: true,
        get: function () {
            return _arrayOps.concat;
        }
    });
    Object.defineProperty(exports, 'ASC', {
        enumerable: true,
        get: function () {
            return _arrayOps.ASC;
        }
    });
    Object.defineProperty(exports, 'DESC', {
        enumerable: true,
        get: function () {
            return _arrayOps.DESC;
        }
    });
    Object.defineProperty(exports, 'join', {
        enumerable: true,
        get: function () {
            return _arrayOps.join;
        }
    });
    Object.defineProperty(exports, 'unzip', {
        enumerable: true,
        get: function () {
            return _arrayOps.unzip;
        }
    });
    Object.defineProperty(exports, 'unzipN', {
        enumerable: true,
        get: function () {
            return _arrayOps.unzipN;
        }
    });
    Object.defineProperty(exports, 'complement', {
        enumerable: true,
        get: function () {
            return _operators.complement;
        }
    });
    Object.defineProperty(exports, 'difference', {
        enumerable: true,
        get: function () {
            return _operators.difference;
        }
    });
    Object.defineProperty(exports, 'union', {
        enumerable: true,
        get: function () {
            return _operators.union;
        }
    });
    Object.defineProperty(exports, 'intersect', {
        enumerable: true,
        get: function () {
            return _operators.intersect;
        }
    });
    Object.defineProperty(exports, 'split', {
        enumerable: true,
        get: function () {
            return _stringOps.split;
        }
    });
    Object.defineProperty(exports, 'lines', {
        enumerable: true,
        get: function () {
            return _stringOps.lines;
        }
    });
    Object.defineProperty(exports, 'words', {
        enumerable: true,
        get: function () {
            return _stringOps.words;
        }
    });
    Object.defineProperty(exports, 'unlines', {
        enumerable: true,
        get: function () {
            return _stringOps.unlines;
        }
    });
    Object.defineProperty(exports, 'unwords', {
        enumerable: true,
        get: function () {
            return _stringOps.unwords;
        }
    });
    Object.defineProperty(exports, 'version', {
        enumerable: true,
        get: function () {
            return _version.version;
        }
    });
});