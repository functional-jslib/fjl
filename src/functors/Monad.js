/**
 * Created by u067265 on 12/9/16.
 */
'use strict';
import './Applicative';
import './Chainable';
import {defineSubClassMulti} from './../defineSubClass';

let Monad = defineSubClassMulti ([Applicative, Chainable],
    function Monad (value) {
        if (!this) {
            return new Monad(value);
        }
        Applicative.apply(this, value);
        Chainable.apply(this);
    });

export default Monad;
