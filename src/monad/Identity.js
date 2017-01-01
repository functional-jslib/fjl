/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Monad from './Monad';
import {subClass} from '../subClass';

export let Identity = subClass(Monad, function Identity(value) {
    if (!(this instanceof Identity)) {
        return Identity.of(value);
    }
    Monad.call(this, value);
}, {
    of: function (value) {
        return new Identity(value);
    }
});

export default Identity;
