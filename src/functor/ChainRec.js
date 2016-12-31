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

let ChainRec = subClass (Chain,
    function ChainRec (value) {
        if (!this) {
            return new ChainRec(value);
        }
        Chain.call(this, value);
    }, null, {
        chainRec: (/*fn, baseValue*/) => {
            // return this;
            return fn(next, done, baseValue);
        },
        flatMapRec: () => {
            return ChainRec.chainRec.apply(null, arguments);
        }
    });

export default ChainRec;
