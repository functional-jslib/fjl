/**
 * Created by edlc on 12/9/16.
 */
'use strict';

import Functor from './Functor';
import {subClass} from './../subClass';

let Extract = subClass (Functor,
    function Extract (value) {
        if (!(this instanceof  Extract)) {
            return new Extract(value);
        }
        Functor.call(this, value);
    }, {
        extract: function () {
            return this.value;
        }
    });

export default Extract;
