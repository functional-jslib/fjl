/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {isset} from '../type-checking';
import {curry3} from '../curry';
import {defineSubClass} from '../defineSubClass';
import {ap, map, chain, join} from '../operators';
import Monad from './Monad';

export let Nothing = defineSubClass(Monad, {
        constructor: function Nothing() {
            if (!(this instanceof Nothing)) {
                return Nothing.of(null);
            }
            Object.defineProperty(this, 'value', {
                value: null
            });
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

    Just = defineSubClass(Monad, {
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

    Maybe = defineSubClass(Monad, {
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
    }),

    maybe = curry3(function (replacement, fn, monad) {
        let subject = monad.chain(value => value);
        return subject instanceof Nothing ? replacement : Just(fn).ap(subject);
    });

export default Maybe;
