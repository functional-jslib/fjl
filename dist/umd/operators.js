(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', './curry', './is'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('./curry'), require('./is'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.curry, global.is);
        global.operators = mod.exports;
    }
})(this, function (exports, _curry, _is) {
    /**
     * Created by elyde on 12/11/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.liftN = exports.joinR = exports.join = exports.fnOrFn = exports.chain = exports.ap = exports.reduceRight = exports.reduce = exports.filter = exports.map = exports.of = exports.empty = exports.concat = exports.equals = exports.id = undefined;
    var id = exports.id = function id(value) {
        return value;
    },
        equals = exports.equals = (0, _curry.curry2)(function (functor1, functor2) {
        return functor1.equals && (0, _is.isFunction)(functor1.equals) ? functor1.equals(functor2) : functor1 === functor2;
    }),
        concat = exports.concat = (0, _curry.curry2)(function (functor1, functor2) {
        return functor1.concat && (0, _is.isFunction)(functor1.concat) ? functor1.concat(functor2) : functor1 + functor2;
    }),
        empty = exports.empty = function empty(functor) {
        return functor.constructor.of();
    },
        of = exports.of = function of(functor) {
        return functor.constructor.of();
    },
        map = exports.map = (0, _curry.curry2)(function (fn, functor) {
        return functor.map(fn);
    }),
        filter = exports.filter = (0, _curry.curry2)(function (fn, functor) {
        return functor.filter(fn);
    }),
        reduce = exports.reduce = (0, _curry.curry2)(function (fn, agg, functor) {
        return functor.reduce(fn, agg);
    }),
        reduceRight = exports.reduceRight = (0, _curry.curry2)(function (fn, agg, functor) {
        return functor.reduceRight(fn, agg);
    }),
        ap = exports.ap = (0, _curry.curry2)(function (obj1, obj2) {
        return obj1.ap(obj2);
    }),
        chain = exports.chain = (0, _curry.curry2)(function (fn, functor) {
        return functor.map(fn).join();
    }),
        fnOrFn = exports.fnOrFn = function fnOrFn(fn) {
        return (0, _is.isFunction)(fn) ? fn : function () {
            return fn;
        };
    },
        join = exports.join = function join(monad) {
        var value = monad.value,
            constructor = monad.constructor;

        return value instanceof constructor ? value : constructor.of(value);
    },
        joinR = exports.joinR = function joinR(monad) {
        var _monad = monad,
            value = _monad.value,
            constructor = _monad.constructor;

        while (value instanceof constructor) {
            monad = value;
        }
        return monad instanceof constructor ? monad : constructor.of(monad);
    },
        liftN = exports.liftN = (0, _curry.curry3)(function (fn, functor1) {
        for (var _len = arguments.length, otherFunctors = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            otherFunctors[_key - 2] = arguments[_key];
        }

        return otherFunctors.reduce(function (aggregator, functor) {
            return aggregator.ap(functor);
        }, functor1.map(fn));
    });

    exports.default = {
        id: id,
        equals: equals,
        concat: concat,
        empty: empty,
        of: of,
        map: map,
        filter: filter,
        reduce: reduce,
        reduceRight: reduceRight,
        ap: ap,
        chain: chain,
        fnOrFn: fnOrFn,
        join: join,
        joinR: joinR,
        liftN: liftN
    };
});