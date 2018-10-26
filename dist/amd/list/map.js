define(['exports', '../jsPlatform/object', '../function/curry', '../object'], function (exports, _object, _curry, _object2) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    /**
     * Maps a function onto a List (string or array) or a functor (value containing a map method).
     * @function module:list.map
     * @param fn {Function} - Function to map on given value.
     * @param xs {Array|String|*}
     * @returns {Array|String|*}
     */
    const map = (0, _curry.curry)((fn, xs) => {
        if (!(0, _object2.isset)(xs)) {
            return xs;
        }
        let out = (0, _object2.of)(xs),
            limit,
            i = 0;
        switch ((0, _object2.typeOf)(xs)) {
            case 'Array':
                limit = (0, _object.length)(xs);
                if (!limit) {
                    return out;
                }
                for (; i < limit; i += 1) {
                    out.push(fn(xs[i], i, xs));
                }
                return out;
            case 'String':
                limit = (0, _object.length)(xs);
                if (!xs) {
                    return out;
                }
                for (; i < limit; i += 1) {
                    out += fn(xs[i], i, xs);
                }
                return out;
            default:
                if ((0, _object2.isFunctor)(xs)) {
                    return xs.map(fn);
                }

                // Other objects
                return Object.keys(xs).reduce((agg, key) => {
                    out[key] = fn(xs[key], key, xs);
                    return out;
                }, out);
        }
    });

    exports.default = map;
});