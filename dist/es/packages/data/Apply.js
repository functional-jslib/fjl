/**
 * Contains `Applicative`'s `Apply` class (class that contains `ap` (a.k.a. `pure`) method).
 * Created by edlc on 12/9/16.
 * @memberOf module:data
 */
import { toFunction } from '../function/toFunction';
import { Functor } from './Functor';
/**
 * Apply construct.
 * @class module:data.Apply
 * @param fn {Function|*}
 * @property value {*}
 * @extends module:data.Functor
 */
export class Apply extends Functor {
    /**
     * Applicative apply operation - applies contained function over passed in functor.
     * @method module:data.Apply#ap
     * @param f {Functor}
     * @returns {Apply}
     */
    ap(f) {
        return new this.constructor(f.map(toFunction(this.valueOf())).valueOf());
    }
}
//# sourceMappingURL=Apply.js.map