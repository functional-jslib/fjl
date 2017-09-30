'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.fPureTakesOneOrMore_ = exports.fPureTakes2_ = exports.fPureTakesOne_ = exports.fPureTakesOneOrMore = exports.fPureTakes2 = exports.fPureTakesOne = undefined;

var _curry = require('./functionOps/curry');

var fPureTakesOne = exports.fPureTakesOne = function fPureTakesOne(name) {
    return function (arg, f) {
        return f[name](arg);
    };
},
    fPureTakes2 = exports.fPureTakes2 = function fPureTakes2(name) {
    return function (arg1, arg2, f) {
        return f[name](arg1, arg2);
    };
},
    fPureTakesOneOrMore = exports.fPureTakesOneOrMore = function fPureTakesOneOrMore(name) {
    return function (f) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        return f[name].apply(f, args);
    };
},
    fPureTakesOne_ = exports.fPureTakesOne_ = function fPureTakesOne_(name) {
    return (0, _curry.curry)(function (arg, f) {
        return f[name](arg);
    });
},
    fPureTakes2_ = exports.fPureTakes2_ = function fPureTakes2_(name) {
    return (0, _curry.curry)(function (arg1, arg2, f) {
        return f[name](arg1, arg2);
    });
},
    fPureTakesOneOrMore_ = exports.fPureTakesOneOrMore_ = function fPureTakesOneOrMore_(name) {
    return (0, _curry.curry2)(function (f) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }

        return f[name].apply(f, args);
    });
}; /**
    * Created by elydelacruz on 7/22/2017.
    */