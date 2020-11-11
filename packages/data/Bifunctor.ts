/**
 * Created by edlc on 12/9/16.
 * @memberOf module:data
 */
import {Functor} from './Functor';
import {Unary} from "../types";

interface BifunctorConstructor<A, B> extends ObjectConstructor {
    new(a: A, b: B): Bifunctor<A, B>;

    readonly prototype: Bifunctor<A, B>;
}

/**
 * Bifunctor class;  Mostly useful for eithers and/or maybes.
 * @class module:data.Bifunctor
 * @param value1 {*}
 * @param value2 {*}
 * @property value {*}
 * @property value2 {*}
 * @extends module:data.Functor
 */
export class Bifunctor<A, B> extends Functor<A> {
    /**
     * @param value1 {*}
     * @param value2 {*}
     * @private
     * @returns {Bifunctor}
     */
    constructor(value1: A, readonly value2: B) {
        super(value1);
    }

    /**
     * Returns wrapped 'second' value.
     * @method module:data.Bifunctor#value2Of
     * @returns {*}
     */
    value2Of(): B {
        return this.value2;
    }

    /**
     * Allows you to map over first 'contained' value.
     * @method module:data.Bifunctor#first
     * @param fn {Function} - Unary operation.
     * @returns {Bifunctor}
     */
    first(fn: Unary<A>): Bifunctor<A, B> {
        return new (this.constructor as BifunctorConstructor<A, B>)(fn(this.valueOf()), this.value2Of());
    }

    /**
     * Allows you to map over second 'contained' value.
     * @method module:data.Bifunctor#second
     * @param fn {Function} - Unary operation.
     * @returns {Bifunctor}
     */
    second(fn: Unary<B>): Bifunctor<A, B> {
        return new (this.constructor as BifunctorConstructor<A, B>)(this.valueOf(), fn(this.value2Of()));
    }

    /**
     * Allows you to map 2 functions over contained values - One function over each value.
     * @method module:data.Bifunctor#bimap
     * @param fn1 {Function} - Unary op.
     * @param fn2 {Function} - Unary op.
     * @returns {Bifunctor}
     */
    bimap(fn1, fn2): Bifunctor<A, B> {
        return new (this.constructor as BifunctorConstructor<A, B>)(
            fn1(this.valueOf()),
            fn2(this.value2Of())
        );
    }
}
