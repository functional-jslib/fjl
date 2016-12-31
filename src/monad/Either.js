/**
 * Created by elyde on 12/10/2016.
 */

'use strict';

import {isset} from './../is';
import {curry2} from './../curry';
import {map} from '../combinators';
import {subClass, subClassMulti} from './../subClass';
import BiFunctor from './../functor/Bifunctor';
import Monad from './Monad';

export let Left = subClass(Monad, {
        constructor: function Left(value) {
            if (!(this instanceof Left)) {
                return Left.of(value);
            }
            Monad.call(this, value);
        },
        map: function (fn) {
            fn(this.value);
            return this;
        }
    }, {
        of: function (value) {
            return new Left(value);
        }
    }),

    Right = subClass(Monad, {
        constructor: function Right(value) {
            if (!(this instanceof Right)) {
                return Right.of(value);
            }
            Monad.call(this, value);
        },
        map: function (fn) {
            let constructor = this.constructor;
            return isset(this.value) ? constructor.of(fn(this.value)) :
                constructor.counterConstructor.of(this.value);
        }
    },
    {
        of: function (value) {
            return new Right(value);
        },
        counterConstructor: Left
    }),

    either = curry2((leftCallback, rightCallback, monad) => {
        let identity = map(value => value, monad),
            ctor = identity.constructor;
        if (ctor === Left) {
            return map(leftCallback, identity);
        }
        else if (ctor === Right) {
            return map(rightCallback, identity);
        }
    }),

    Either = subClassMulti([Monad, BiFunctor], {
        constructor: function Either(left, right) {
            if (!(this instanceof Either)) {
                return Either.of(left, right);
            }
            BiFunctor.call(this, left, right);
        }
    },
    {
        of: function (left, right) {
            return new Either(left, right);
        },
        Left,
        Right,
        either
    });

export default Either;
