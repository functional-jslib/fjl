define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    const fPureTakesOne = exports.fPureTakesOne = name => (arg, f) => f[name](arg),
          fPureTakes2 = exports.fPureTakes2 = name => (arg1, arg2, f) => f[name](arg1, arg2),
          fPureTakesOneOrMore = exports.fPureTakesOneOrMore = name => (f, ...args) => f[name](...args);
});