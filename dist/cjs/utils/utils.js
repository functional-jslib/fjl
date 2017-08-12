'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fPureTakesOneOrMore = exports.fPureTakes2 = exports.fPureTakesOne = undefined;

var _curry = require('../functionOps/curry');

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
    fPureTakesOneOrMore = exports.fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return (0, _curry.curry2)(function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return f[name].apply(f, args);
    });
}; /**
    * Created by elydelacruz on 7/22/2017.
    */