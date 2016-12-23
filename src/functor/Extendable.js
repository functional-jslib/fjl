/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Functor from './Functor';
import {subClassOf} from './../subClassOf';

let Extendable = subClassOf (Functor,
    function Extendable (value) {
        if (!(this instanceof  Extendable)) {
            return new Extendable(value);
        }
        Functor.call(this, value);
    }, {
        extend: function (fn) {
            return this.map(fn);
        }
    });

export default Extendable;
