/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Applicable from './Applicable';
import {subClassOf} from './../subClassOf';

let Applicative = subClassOf (Applicable,
    function Applicative(value) {
        if (!this) {
            return Applicative.of(value);
        }
        Applicable.call(this, value);
    },
    null,
    {
        of: function (value) {
            return new Applicative(value);
        }
    });

export default Applicative;
