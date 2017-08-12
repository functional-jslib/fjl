define(['exports', './is', './objectPrelude', '../functionOps/apply', './typeOf'], function (exports, _is, _objectPrelude, _apply, _typeOf) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.of = undefined;
    const of = exports.of = (x, ...args) => {
        const constructor = x.constructor,
              typeOfX = (0, _typeOf.typeOf)(x);
        if ((0, _objectPrelude.hasOwnProperty)('of', constructor)) {
            return (0, _apply.apply)(constructor.of, args);
        } else if ((0, _is.isUsableImmutablePrimitive)(typeOfX)) {
            return (0, _apply.apply)(constructor, args);
        } else if ((0, _is.isFunction)(constructor)) {
            return new constructor(...args);
        }
        return undefined;
    };
});