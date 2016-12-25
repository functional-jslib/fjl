/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Monad from './Monad';
import {subClass} from '../subClass';

export let Identity = subClass(Monad, function Identity(value) {
    Monad.call(this, value);
});

export default Identity;
