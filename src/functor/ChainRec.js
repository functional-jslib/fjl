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
import Chain from './Chain';
import {subClass} from './../subClass';

let ChainRecursive = subClass (Chain,
    function ChainRecursive (value) {
        if (!this) {
            return new Chain(value);
        }
        Chain.call(this, value);
    }, null, {
        chainRec: (/*fn, baseValue*/) => {
            return this;
            // return fn(next, done, baseValue);
        },
        flatMapRec: () => {
            return ChainRecursive.chainRec.apply(null, arguments);
        }
    });

export default Chain;
