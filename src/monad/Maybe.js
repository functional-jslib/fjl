/**
 * Created by elyde on 12/10/2016.
 */
'use strict';

import {isset} from '../type-checking';
import {curry3} from '../curry';
import {defineSubClass} from '../defineSubClass';
import Monad from './Monad';

export let maybe = curry3(function (replacement, fn, monad) {
    let subject = monad.chain(value => value);
    return subject instanceof Nothing ? replacement : Just(fn).ap(subject);
});

let nothing =  () => Nothing.of(null);

export let Nothing = defineSubClass(Monad, {
        constructor: function Nothing() {
            if (!(this instanceof Nothing)) {
                return nothing();
            }
            Object.defineProperty(this, 'value', {
                value: null
            });
        },
        map: nothing,
        join: nothing,
        ap: nothing,
        chain: nothing
    });

export let Just = defineSubClass(Monad, {
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
        counterConstructor: Nothing
    });

export let Maybe = defineSubClass(Monad, {
    constructor: function Maybe(value) {
        if (!(this instanceof Maybe)) {
            return Maybe.of(value);
        }
        return isset(value) ? Maybe.Just(value) : Maybe.Nothing();
    }
}, {
    maybe,
    Just,
    Nothing
});

export default Maybe;
