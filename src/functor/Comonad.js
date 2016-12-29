/**
 * Created by edlc on 12/9/16.
 */
/**
 * Created by edlc on 12/9/16.
 */
/**
 * Created by edlc on 12/9/16.
 */
'use strict';
import Apply from './Apply';
import {subClass} from './../subClass';

let Chain = subClass (Apply,
    function Chain (value) {
        if (!this) {
            return new Chain(value);
        }
        Apply.call(this, value);
    }, {
        join: function () {
            return this.value instanceof this.constructor ?
                this.value : new this.constructor(this.value);
        },

        chain: function (fn) {
            return this.map(fn).join();
        }
    });

export default Chain;
