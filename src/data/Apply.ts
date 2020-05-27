/**
 * Contains `Applicative`'s `Apply` class (class that contains `ap` (a.k.a. `pure`) method).
 * Created by edlc on 12/9/16.
 * @memberOf module:functor
 */

import {toFunction} from 'fjl';
import Functor from './Functor';

/**
 * Apply construct.
 * @class module:functor.Apply
 * @param fn {Function|*}
 * @property value {*}
 * @extends module:functor.Functor
 */
export default class Apply extends Functor {
    /**
     * Applicative apply operation - applies contained function over passed in functor.
     * @method module:functor.Apply#ap
     * @param x {Functor}
     * @returns {Apply}
     */
    ap (x) {
        return x.map(toFunction(this.valueOf()));
    }
}
