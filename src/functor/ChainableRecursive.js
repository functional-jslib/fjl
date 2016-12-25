/**
 * Created by elyde on 12/25/2016.
 */
/**
 * Created by edlc on 12/9/16.
 */
/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Chainable from './Chainable';
import {subClass} from './../subClass';

let ChainableRecursive = subClass (Chainable,
    function ChainableRecursive (value) {
        if (!this) {
            return new Chainable(value);
        }
        Chainable.call(this, value);
    }, null, {
        chainRec: function (/*fn, baseValue*/) {
            return this;
            // return fn(next, done, baseValue);
        }
    });

export default Chainable;
