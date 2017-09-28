define(['exports', '../functionOps/curry', '../objectOps/is'], function (exports, _curry, _is) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = Object.getOwnPropertyNames(Math).reduce((agg, key) => {
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
});