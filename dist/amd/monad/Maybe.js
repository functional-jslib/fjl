define(['exports', '../is', '../curry', '../subClass', '../operators', './Monad'], function (exports, _is, _curry, _subClass, _operators, _Monad) {
    /**
     * Created by elyde on 12/10/2016.
     */
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Maybe = exports.maybe = exports.Just = exports.Nothing = undefined;

    var _Monad2 = _interopRequireDefault(_Monad);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _protected = {
        NothingSingleton: null,
        NothingSingletonCreated: null
    };

    var Nothing = exports.Nothing = (0, _subClass.subClass)(_Monad2.default, {
        constructor: function Nothing() {
            var NothingSingleton = _protected.NothingSingleton,
                NothingSingletonCreated = _protected.NothingSingletonCreated;

            if (NothingSingleton) {
                return NothingSingleton;
            } else if (!(this instanceof Nothing)) {
                return Nothing.of();
            } else if (!NothingSingletonCreated) {
                _protected.NothingSingletonCreated = true;
                _protected.NothingSingleton = Nothing.of();
                Object.freeze(_protected);
            } else if (!this.hasOwnProperty('value')) {
                Object.defineProperty(this, 'value', {
                    value: null
                });
            }
        },
        map: function map() {
            return this;
        },
        join: function join() {
            return this;
        },
        ap: function ap() {
            return this;
        },
        chain: function chain() {
            return this;
        }
    }, {
        of: function of() {
            return new Nothing();
        }
    }),
        Just = exports.Just = (0, _subClass.subClass)(_Monad2.default, {
        constructor: function Just(value) {
            if (!(this instanceof Just)) {
                return Just.of(value);
            }
            _Monad2.default.call(this, value);
        },
        map: function map(fn) {
            var constructor = this.constructor;
            return (0, _is.isset)(this.value) ? constructor.of(fn(this.value)) : constructor.counterConstructor.of(this.value);
        }
    }, {
        of: function of(value) {
            return new Just(value);
        },
        counterConstructor: Nothing
    }),


    /**
     * @param replacement {*} - Replacement value to return if functor maps to a functor with an empty
     *  value (a value of undefined | null).
     * @param fn {Function} - Function to map to.
     * @param monad {Function<map {Function}> - Functor
     * @returns {*}
     */
    maybe = exports.maybe = (0, _curry.curry3)(function (replacement, fn, monad) {
        var subject = monad.chain(function (value) {
            return value;
        });
        return subject instanceof Nothing ? replacement : subject.map(fn).value;
    }),
        Maybe = exports.Maybe = (0, _subClass.subClass)(_Monad2.default, {
        constructor: function Maybe(value) {
            if (!(this instanceof Maybe)) {
                return Maybe.of(value);
            }
            _Monad2.default.call(this, Just(value));
        },
        join: function join() {
            return (0, _operators.join)(this.value);
        },
        map: function map(fn) {
            return (0, _operators.map)(fn, this.value);
        },
        ap: function ap(functor) {
            return (0, _operators.ap)(this.value, functor);
        },
        chain: function chain(fn) {
            return (0, _operators.chain)(fn, this.value);
        }
    }, {
        of: function of(value) {
            return new Maybe(value);
        },
        Just: Just,
        Nothing: Nothing,
        maybe: maybe
    });

    exports.default = Maybe;
});