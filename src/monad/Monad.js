/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Applicative from '../functor/Applicative';
import Chain from '../functor/Chain';
import {subClassMulti} from '../subClass';

export let Monad = subClassMulti ([Applicative, Chain],
    function Monad (value) {
        if (!this) {
            return Monad.of(value);
        }
        Applicative.apply(this);
        Chain.apply(this);
        this.value = value;
    },
    null,
    {
        of: function (value) {
            return new Monad(value);
        }
    });

export default Monad;
