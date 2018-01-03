'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.of = undefined;

var _is = require('./_is');

var _object = require('../_jsPlatform/_object');

var _function = require('../_jsPlatform/_function');

var of = exports.of = function of(x) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    if (!(0, _is.isset)(x)) {
        return undefined;
    }
    var constructor = x.constructor;
    if ((0, _object.hasOwnProperty)('of', constructor)) {
        return (0, _function.apply)(constructor.of, args);
    } else if ((0, _is.isUsableImmutablePrimitive)(x)) {
        return (0, _function.apply)(constructor, args);
    } else if ((0, _is.isFunction)(constructor)) {
        return new (Function.prototype.bind.apply(constructor, [null].concat(args)))();
    }
    return undefined;
};