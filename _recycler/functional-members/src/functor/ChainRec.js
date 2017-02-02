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
        if (!(this instanceof ChainRec)) {
            return new ChainRec(value);
        }
        Chain.call(this, value);
    }, null, {
        // chainRec: (fn, aggregator) => {
        //     return fn(next, done, aggregator);
        // }
    });

export default ChainRec;
