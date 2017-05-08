/**
 * Created by edlc on 12/9/16.
 */

'use strict';

import Functor from './Functor';
import {subClass} from '../subClass';

let Apply = subClass(Functor,
    function Apply (value) {
        if (!(this instanceof Apply)) {
            return new Apply(value);
        }
        Functor.call(this, value);
    },
    {
        ap: function  (functor) {
            return functor.map(this.value);
        }
    });

export default Apply;
