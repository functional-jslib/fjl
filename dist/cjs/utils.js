'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fnOrError = exports.fPureTakesOneOrMore = exports.fPureTakes5 = exports.fPureTakes4 = exports.fPureTakes3 = exports.fPureTakes2 = exports.fPureTakesOne = undefined;

var _typeOf = require('./object/typeOf');

var _curry = require('./function/curry');

var fPureTakesOne = exports.fPureTakesOne = function fPureTakesOne(name) {
    return (0, _curry.curry)(function (arg, f) {
        return f[name](arg);
    });
},
    fPureTakes2 = exports.fPureTakes2 = function fPureTakes2(name) {
    return (0, _curry.curry)(function (arg1, arg2, f) {
        return f[name](arg1, arg2);
    });
},
    fPureTakes3 = exports.fPureTakes3 = function fPureTakes3(name) {
    return (0, _curry.curry)(function (arg1, arg2, arg3, f) {
        return f[name](arg1, arg2, arg3);
    });
},
    fPureTakes4 = exports.fPureTakes4 = function fPureTakes4(name) {
    return (0, _curry.curry)(function (arg1, arg2, arg3, arg4, f) {
        return f[name](arg1, arg2, arg3, arg4);
    });
},
    fPureTakes5 = exports.fPureTakes5 = function fPureTakes5(name) {
    return (0, _curry.curry)(function (arg1, arg2, arg3, arg4, arg5, f) {
        return f[name](arg1, arg2, arg3, arg4, arg5);
    });
},
    fPureTakesOneOrMore = exports.fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return (0, _curry.curry2)(function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return f[name].apply(f, args);
    });
},
    fnOrError = exports.fnOrError = function fnOrError(symbolName, f) {
    if (!f || typeof f !== 'function') {
        throw new Error(symbolName + ' should be a function. ' + ('Type received: ' + (0, _typeOf.typeOf)(f) + ';  Value received: ' + f + '.'));
    }
    return f;
};