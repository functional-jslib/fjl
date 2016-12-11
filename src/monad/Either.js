/**
 * Created by elyde on 12/10/2016.
 */
'use strict';
/**
 * Created by elyde on 11/20/2016.
 */

'use strict';

import {curry2} from './../curry';
import {isset} from './../type-checking';
import {defineSubClass, defineSubClassMulti} from './../defineSubClass';
import Maybe, {Just} from './Maybe';
import {Bifunctor as BiFunctor} from './../functor/Bifunctor';
import Monad from './Monad';

let either = curry2(function (leftCallback, rightCallback, monad) {
    let identity = monad.map(value => value);
    switch (identity.constructor) {
        case Left:
            return leftCallback(identity.value);
        case Right:
            return rightCallback(identity.value);
    }
});

let Left = defineSubClass (Just, {
    constructor: function Left(value) {
        if (!(this instanceof Left)) {
            return Left.of(value);
        }
        Just.call(this, value);
    },
    map: function (fn) {
        fn(this.value);
        return this;
    }
});

let Right = defineSubClass (Just, {
    constructor: function Right(value) {
        if (!(this instanceof Right)) {
            return Right.of(value);
        }
        Just.call(this, value);
    }
}, {
    counterConstructor: Left
});

export let Either = defineSubClassMulti ([Monad, BiFunctor], {
    constructor: function Either(left, right) {
        if (!(this instanceof Either)) {
            return new Either(left, right);
        }
        BiFunctor.call(this, left, right);
        Monad.call(this);
    }
}, {
    either,
    Left,
    Right
});

export default Either;
