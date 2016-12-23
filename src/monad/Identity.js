/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Monad from './Monad';
import {subClassOf} from '../subClassOf';

export let Identity = subClassOf(Monad, function Identity(value) {
    Monad.call(this, value);
});

export default Identity;
