define(['exports', './is_', '../_jsPlatform/object_', '../_jsPlatform/function_'], function (exports, _is_, _object_, _function_) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.of = undefined;
    const of = exports.of = (x, ...args) => {
        if (!(0, _is_.isset)(x)) {
            return undefined;
        }
        const constructor = x.constructor;
        if ((0, _object_.hasOwnProperty)('of', constructor)) {
            return (0, _function_.apply)(constructor.of, args);
        } else if ((0, _is_.isUsableImmutablePrimitive)(x)) {
            return (0, _function_.apply)(constructor, args);
        } else if ((0, _is_.isFunction)(constructor)) {
            return new constructor(...args);
        }
        return undefined;
    };
});