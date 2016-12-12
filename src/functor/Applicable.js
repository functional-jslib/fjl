/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Functor from './Functor';
import {defineSubClass} from './../defineSubClass';

let Applicable = defineSubClass(Functor,
    function Applicable (value) {
        if (!this) {
            return new Applicable(value);
        }
        Functor.call(this, value);
    },
    {
        ap (functor) {
            return functor.map(this.value);
        }
    });

export default Applicable;
