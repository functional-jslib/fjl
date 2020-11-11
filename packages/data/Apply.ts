/**
 * Contains `Applicative`'s `Apply` class (class that contains `ap` (a.k.a. `pure`) method).
 * Created by edlc on 12/9/16.
 * @memberOf module:data
 */

import {toFunction} from '../function/toFunction';
import {Functor} from './Functor';
import {MapOp} from "../platform/array";

export interface ApplyConstructor<T> extends ObjectConstructor {
    new(x: T): Apply<T>;

    readonly prototype: Apply<T>;
}

/**
 * Apply construct.
 * @class module:data.Apply
 * @param fn {Function|*}
 * @property value {*}
 * @extends module:data.Functor
 */
export class Apply<T> extends Functor<T> {
    /**
     * Applicative apply operation - applies contained function over passed in functor.
     * @method module:data.Apply#ap
     * @param f {Functor}
     * @returns {Apply}
     */
    ap(f: Functor<T>): Apply<T> {
        return new (this.constructor as ApplyConstructor<T>)(f.map(
            (toFunction(this.valueOf()) as MapOp<T, Functor<T>, T>)
        ).valueOf());
    }
}
