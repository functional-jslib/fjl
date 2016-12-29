define(['exports', './curry', './is'], function (exports, _curry, _is) {
    /**
     * Created by elyde on 12/11/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.minLength = exports.maxLength = exports.liftN = exports.chain = exports.joinR = exports.join = exports.ap = exports.reduceRight = exports.reduce = exports.filter = exports.map = exports.empty = exports.of = exports.concat = exports.equals = exports.id = undefined;
    var id = exports.id = function id(value) {
        return value;
    },
        equals = exports.equals = (0, _curry.curry2)(function (functor1, functor2) {
        return functor1.equals && (0, _is.isFunction)(functor1.equals) ? functor1.equals(functor2) : functor1 === functor2;
    }),
        concat = exports.concat = (0, _curry.curry2)(function (functor1, functor2) {
        return functor1.concat && (0, _is.isFunction)(functor1.concat) ? functor1.concat(functor2) : functor1 + functor2;
    }),
        of = exports.of = function of(functor) {
        var constructor = functor.constructor,
            retVal = void 0;
        if (constructor.of) {
            retVal = constructor.of();
        } else if (!(0, _is.isPrimitive)(functor)) {
            retVal = constructor();
        } else {
            retVal = new constructor();
        }
        return retVal;
    },
        empty = exports.empty = function empty(functor) {
        return of(functor);
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
        chain = exports.chain = (0, _curry.curry2)(function (fn, functor) {
        return join(map(fn, functor));
    }),
        liftN = exports.liftN = (0, _curry.curry3)(function (fn, functor1) {
        for (var _len = arguments.length, otherFunctors = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            otherFunctors[_key - 2] = arguments[_key];
        }

        return otherFunctors.reduce(function (aggregator, functor) {
            return ap(aggregator, functor);
        }, map(fn, functor1));
    }),
        maxLength = exports.maxLength = function maxLength(array1, array2) {
        if (array1.length > array2.length) {
            return array1;
        } else if (array2.length > array1.length) {
            return array2;
        }
        return array1;
    },
        minLength = exports.minLength = function minLength(array1, array2) {
        if (array1.length < array2.length) {
            return array1;
        } else if (array2.length < array1.length) {
            return array2;
        }
        return array1;
    };

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
        join: join,
        joinR: joinR,
        liftN: liftN,
        maxLength: maxLength,
        minLength: minLength
    };
});