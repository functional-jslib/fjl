define(['exports', './_typeOf', './_assocList'], function (exports, _typeOf, _assocList) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.toArray = undefined;
    const

    /**
     * Converts incoming value to an array.
     * @note For `WeakMap`, `WeakSet`, `Map` and `Set` result is the same as calling `Array.from` on such.
     * @note For `null`, `undefined`, `NaN`, `Number{}`, `Symbol{}`, `Boolean{}` returns an empty array.
     * @note Method does a shallow conversion;
     * @function module:object.toArray
     * @param x {*} - Thing to convert from.
     * @returns {Array}
     */
    toArray = exports.toArray = x => {
        switch ((0, _typeOf.typeOf)(x)) {
            case 'Null':
            case 'Undefined':
                return [];
            case String.name:
            case Array.name:
            case 'WeakMap':
            case 'WeakSet':
            case 'Map':
            case 'Set':
                return Array.from(x);
            case Object.name:
            default:
                return (0, _assocList.toAssocList)(x);
        }
    };
});