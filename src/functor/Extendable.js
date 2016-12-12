/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Functor from './Functor';
import {defineSubClass} from './../defineSubClass';

let Extendable = defineSubClass (Functor,
    function Extendable (value) {
        if (!this) {
            return new Extendable(value);
        }
        Functor.call(this, value);
    }, {
        extend: function (fn) {
            return this.map(fn);
        }
    });

export default Extendable;
