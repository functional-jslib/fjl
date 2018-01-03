define(['exports', './_is', '../_jsPlatform/_object', '../_jsPlatform/_function'], function (exports, _is, _object, _function) {
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
        if ((0, _object.hasOwnProperty)('of', constructor)) {
            return (0, _function.apply)(constructor.of, args);
        } else if ((0, _is.isUsableImmutablePrimitive)(x)) {
            return (0, _function.apply)(constructor, args);
        } else if ((0, _is.isFunction)(constructor)) {
            return new constructor(...args);
        }
        return undefined;
    };
});