/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Applicable from './Applicable';
import {defineSubClass} from './../defineSubClass';

export default defineSubClass (Applicable,
    function Applicative(value) {
        if (!this) {
            return new Applicative(value);
        }
        Applicable.call(this, value);
    },
    null,
    {
        of (value) {
            return new this(value);
        }
    });
