/**
 * Created by u067265 on 12/9/16.
 */
'use strict';
import Applicative from './Applicative';
import Chainable from './Chainable';
import {defineSubClassMulti} from './../defineSubClass';

let Monad = defineSubClassMulti ([Applicative, Chainable],
    function Monad (value) {
        if (!this) {
            return new Monad(value);
        }
        Applicative.apply(this);
        Chainable.apply(this);
        this.value = value;
    });

export default Monad;
