/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {isset} from '../type-checking';
import {curry3} from '../curry';
import {subClass} from '../subClass';
import {ap, map, chain, join} from '../operators';
import Monad from './Monad';

const _protected = {
    NothingSingleton: null,
    NothingSingletonCreated: null
};

export let Nothing = subClass(Monad, {
        constructor: function Nothing() {
            let {NothingSingleton, NothingSingletonCreated} = _protected;
            if (NothingSingleton) {
                return NothingSingleton;
            }
            else if (!(this instanceof Nothing)) {
                return Nothing.of();
            }
            else if (!NothingSingletonCreated) {
                _protected.NothingSingletonCreated = true;
                _protected.NothingSingleton = Nothing.of();
                Object.freeze(_protected);
            }
            else if (!this.hasOwnProperty('value')) {
                Object.defineProperty(this, 'value', {
                    value: null
                });
            }
        },
        map: function () {
            return this;
        },
        join: function () {
            return this;
        },
        ap: function () {
            return this;
        },
        chain: function () {
            return this;
        }
    }, {
        of: function () {
            return new Nothing();
        }
    }),

    Just = subClass(Monad, {
        constructor: function Just(value) {
            if (!(this instanceof Just)) {
                return Just.of(value);
            }
            Monad.call(this, value);
        },
        map: function (fn) {
            let constructor = this.constructor;
            return isset(this.value) ? constructor.of(fn(this.value)) :
                constructor.counterConstructor.of(this.value);
        }
    }, {
        of: function (value) {
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
    maybe = curry3(function (replacement, fn, monad) {
        let subject = monad.chain(value => value);
        return subject instanceof Nothing ? replacement : subject.map(fn).value;
    }),

    Maybe = subClass(Monad, {
        constructor: function Maybe(value) {
            if (!(this instanceof Maybe)) {
                return Maybe.of(value);
            }
            Monad.call(this, Just(value));
        },
        join: function () {
            return join(this.value);
        },
        map: function (fn) {
            return map(fn, this.value);
        },
        ap: function (functor) {
            return ap(this.value, functor);
        },
        chain: function (fn) {
            return chain(fn, this.value);
        }
    }, {
        of: function (value) {
            return new Maybe(value);
        },
        Just,
        Nothing,
        maybe
    });

export default Maybe;
