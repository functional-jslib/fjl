/**
 * Created by u067265 on 12/9/16.
 */
/**
 * Created by u067265 on 12/9/16.
 */
'use strict';
import Applicable from './Applicable';
import {defineSubClass} from './../defineSubClass';

let Chainable = defineSubClass (Applicable,
    function Chainable (value) {
        if (!this) {
            return new Chainable(value);
        }
        Applicable.apply(this, value);
    }, {
        chain (fn) {
            return this.map(fn).join();
        }
    });

export default Chainable;
