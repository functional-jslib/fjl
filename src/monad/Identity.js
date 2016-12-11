/**
 * Created by u067265 on 12/9/16.
 */
'use strict';
import Monad from './Monad';
import {defineSubClass} from '../defineSubClass';

let Identity = defineSubClass(Monad, function Identity(value) {
    Monad.apply(this, arguments);
});

export default Identity;
