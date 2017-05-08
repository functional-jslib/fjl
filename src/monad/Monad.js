/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Applicative from '../functor/Applicative';
import Chain from '../functor/Chain';
import {subClassMulti} from '../subClass';

function Monad (value) {
    if (!(this instanceof Monad)) {
        return Monad.of(value);
    }
    Applicative.apply(this);
    Chain.apply(this);
    this.value = value;
}

function isMonad (value) {
    return value instanceof Monad;
}

subClassMulti ([Applicative, Chain], Monad, null, {
        isMonad: isMonad,
        of: value => new Monad(value),
        unwrapMonad: value => isMonad(value) ? Monad.unwrapMonad(value.value) : value
    });

export default Monad;
