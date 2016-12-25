/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Maybe = exports.maybe = exports.Just = exports.Nothing = undefined;

var _is = require('../is');

var _curry = require('../curry');

var _subClass = require('../subClass');

var _operators = require('../operators');

var _Monad = require('./Monad');

var _Monad2 = _interopRequireDefault(_Monad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _protected = {
    NothingSingleton: null,
    NothingSingletonCreated: null
},
    returnThis = function returnThis() {
    return this;
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
            _protected.NothingSingleton = this;
            Object.freeze(_protected);
        }
        if (!this.hasOwnProperty('value')) {
            Object.defineProperty(this, 'value', {
                value: null
            });
        }
    },
    map: returnThis,
    join: returnThis,
    ap: returnThis,
    chain: returnThis
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
        return (0, _operators.join)(Maybe.of((0, _operators.join)((0, _operators.map)(_operators.id, this.value))));
    },
    map: function map(fn) {
        return Maybe.of(fn((0, _operators.map)(_operators.id, this.value)));
    },
    ap: function ap(functor) {
        return Maybe.of((0, _operators.ap)((0, _operators.map)(_operators.id, this.value), functor));
    },
    chain: function chain(fn) {
        return Maybe.of((0, _operators.chain)(fn, (0, _operators.map)(_operators.id, this.value)));
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