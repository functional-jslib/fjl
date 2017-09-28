(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports', '../functionOps/curry', '../objectOps/is'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports, require('../functionOps/curry'), require('../objectOps/is'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports, global.curry, global.is);
        global.numberPrelude = mod.exports;
    }
})(this, function (module, exports, _curry, _is) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Object.getOwnPropertyNames(Math).reduce(function (agg, key) {
        if (!(0, _is.isFunction)(Math[key])) {
            return agg;
        }
        switch (Math[key].length) {
            case 0:
            case 1:
                agg[key] = Math[key];
                break;
            default:
                agg[key] = (0, _curry.curry)(Math[key]);
                break;
        }
        return agg;
    }, {});
    module.exports = exports['default'];
});