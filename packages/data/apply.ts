/**
 * Contains `Applicative`'s `Apply` class (class that contains `ap` (a.k.a. `pure`) method).
 * Created 12/9/16.
 */

import {toFunction} from '../function/toFunction';
import {Functor} from './functor';
import {MapOp} from "../platform/array";

export interface ApplyConstructor<T> extends ObjectConstructor {
    new(x: T): Apply<T>;

    readonly prototype: Apply<T>;
}

export class Apply<T> extends Functor<T> {
    /**
     * Applicative apply operation - applies contained function over passed in functor.
     */
    ap(f: Functor<T>): Apply<T> {
        return new (this.constructor as ApplyConstructor<T>)(f.map(
            (toFunction(this.valueOf()) as MapOp<T, Functor<T>, T>)
        ).valueOf());
    }
}
