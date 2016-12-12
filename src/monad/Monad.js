/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Applicative from '../functor/Applicative';
import Chainable from '../functor/Chainable';
import {defineSubClassMulti} from '../defineSubClass';

export let Monad = defineSubClassMulti ([Applicative, Chainable],
    function Monad (value) {
        if (!this) {
            return new Monad(value);
        }
        Applicative.apply(this);
        Chainable.apply(this);
        this.value = value;
    });

export default Monad;
