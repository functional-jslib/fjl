'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.of = undefined;

var _is_ = require('./is_');

var _object_ = require('../jsPlatform/object_');

var _function_ = require('../jsPlatform/function_');

var of = exports.of = function of(x) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (!(0, _is_.isset)(x)) {
        return undefined;
    }
    var constructor = x.constructor;
    if ((0, _object_.hasOwnProperty)('of', constructor)) {
        return (0, _function_.apply)(constructor.of, args);
    } else if ((0, _is_.isUsableImmutablePrimitive)(x)) {
        return (0, _function_.apply)(constructor, args);
    } else if ((0, _is_.isFunction)(constructor)) {
        return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
    }
    return undefined;
};