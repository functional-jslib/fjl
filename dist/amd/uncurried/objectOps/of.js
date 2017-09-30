define(['exports', './is', '../jsPlatform/object_', '../functionOps/apply'], function (exports, _is, _object_, _apply) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.of = undefined;
    const of = exports.of = (x, ...args) => {
        if (!(0, _is.isset)(x)) {
            return undefined;
        }
        const constructor = x.constructor;
        if ((0, _object_.hasOwnProperty)('of', constructor)) {
            return (0, _apply.apply)(constructor.of, args);
        } else if ((0, _is.isUsableImmutablePrimitive)(x)) {
            return (0, _apply.apply)(constructor, args);
        } else if ((0, _is.isFunction)(constructor)) {
            return new constructor(...args);
        }
        return undefined;
    };
});