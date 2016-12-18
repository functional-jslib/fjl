/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Monad from './Monad';
import {subClass} from '../subClass';

let Identity = subClass(Monad, function Identity(value) {
    Monad.apply(this, arguments);
});

export default Identity;
