define(['exports', '../functionOps/curry'], function (exports, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.fPureTakesOneOrMore = exports.fPureTakes2 = exports.fPureTakesOne = undefined;
    const fPureTakesOne = exports.fPureTakesOne = name => (0, _curry.curry)((arg, f) => f[name](arg)),
          fPureTakes2 = exports.fPureTakes2 = name => (0, _curry.curry)((arg1, arg2, f) => f[name](arg1, arg2)),
          fPureTakesOneOrMore = exports.fPureTakesOneOrMore = name => (0, _curry.curry2)((f, ...args) => f[name](...args)); /**
                                                                                                                             * Created by elydelacruz on 7/22/2017.
                                                                                                                             */
});