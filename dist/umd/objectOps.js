(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './assign', './curry'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./assign'), require('./curry'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.assign, global.curry);
        global.objectOps = mod.exports;
    }
})(this, function (exports, _assign, _curry) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.complement = exports.difference = exports.intersect = exports.union = exports.keys = exports.length = exports.toString = exports.hasOwnProperty = undefined;
    /**
     * Created by elyde on 12/10/2016.
     * Set functions for objects.
     */

    var hasOwnProperty = exports.hasOwnProperty = (0, _curry.curry2)(function (x, propName) {
        return Object.prototype.hasOwnProperty.call(x, propName);
    }),
        toString = exports.toString = function toString(obj) {
        return obj.toString();
    },
        length = exports.length = function length(x) {
        return x.length;
    },
        keys = exports.keys = function keys(x) {
        return Object.keys(x);
    },
        union = exports.union = (0, _curry.curry2)(function (obj1, obj2) {
        return (0, _assign.assignDeep)(obj1, obj2);
    }),
        intersect = exports.intersect = (0, _curry.curry2)(function (obj1, obj2) {
        return Object.keys(obj1).reduce(function (agg, key) {
            if (hasOwnProperty(obj2, key)) {
                agg[key] = obj2[key];
            }
            return agg;
        }, {});
    }),
        difference = exports.difference = (0, _curry.curry2)(function (obj1, obj2) {
        return Object.keys(obj1).reduce(function (agg, key) {
            if (!hasOwnProperty(obj2, key)) {
                agg[key] = obj1[key];
            }
            return agg;
        }, {});
    }),
        complement = exports.complement = (0, _curry.curry2)(function (obj0) {
        for (var _len = arguments.length, objs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            objs[_key - 1] = arguments[_key];
        }

        return objs.reduce(function (agg, obj) {
            return (0, _assign.assignDeep)(agg, difference(obj, obj0));
        }, {});
    });

    exports.default = {
        hasOwnProperty: hasOwnProperty,
        length: length,
        complement: complement,
        difference: difference,
        intersect: intersect,
        union: union
    };
});