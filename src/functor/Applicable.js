/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Functor from './Functor';
import {subClass} from './../subClass';

let Applicable = subClass(Functor,
    function Applicable (value) {
        if (!this) {
            return new Applicable(value);
        }
        Functor.call(this, value);
    },
    {
        ap: function  (functor) {
            return functor.map(this.value);
        }
    });

export default Applicable;
