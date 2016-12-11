/**
 * Created by u067265 on 12/9/16.
 */
'use strict';
import './Functor';
import {defineSubClass} from './../defineSubClass';

let Applicable = defineSubClass(Functor,
    function Applicable (value) {
        if (!this) {
            return new Applicable(value);
        }
        Functor.apply(this, value);
    },
    {
        ap (functor) {
            return functor.map(this.value);
        }
    });

export default Applicable;
