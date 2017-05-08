/**
 * Created by edlc on 12/9/16.
 */
/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Extend from './Extend';
import {subClass} from '../subClass';

let Comonad = subClass (Extend,
    function Comonad (value) {
        if (!(this instanceof  Comonad)) {
            return new Comonad(value);
        }
        Extend.call(this, value);
    }, {
        extract: function () {
            return this.value;
        }
    });

export default Comonad;
