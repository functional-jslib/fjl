/**
 * Created by edlc on 12/9/16.
 */
/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Apply from './Apply';
import {subClass} from './../subClass';

let Comonad = subClass (Apply,
    function Comonad (value) {
        if (!(this instanceof  Comonad)) {
            return new Comonad(value);
        }
        Apply.call(this, value);
    }, {
        extract: function () {
            return this.value;
        }
    });

export default Comonad;
