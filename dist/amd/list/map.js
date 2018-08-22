define(['exports', '../jsPlatform/object', '../function/curry'], function (exports, _object, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    /**
     * @function module:list.map
     * @param fn {Function} - Function to map on array.
     * @param xs {Array}
     * @returns {Array}
     */
    const map = (0, _curry.curry)((fn, xs) => {
        let ind = 0,
            limit = (0, _object.length)(xs),
            out = [];
        if (!limit) {
            return out;
        }
        while (ind < limit) {
            out.push(fn(xs[ind], ind, xs));
            ind += 1;
        }
        return out;
    });

    exports.default = map;
});