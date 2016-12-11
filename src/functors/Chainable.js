/**
 * Created by u067265 on 12/9/16.
 */
/**
 * Created by u067265 on 12/9/16.
 */
'use strict';
import './Applicable';
import {defineSubClass} from './../defineSubClass';

function Chainable (value) {
    if (!this) {
        return new Chainable(value);
    }
    Applicable.apply(this, value);
}

export default defineSubClass (Applicable, Chainable, {
    chain (fn) {
        return this.map(fn).join();
    }
});
