/**
 * Created 12/9/16.
 */
import {Functor} from './functor';
import {Unary} from "../types";

export interface BifunctorConstructor<A, B> extends ObjectConstructor {
    new(a: A, b: B): Bifunctor<A, B>;

    readonly prototype: Bifunctor<A, B>;
}

/**
 * Bifunctor class;  Used by './Either' and './Maybe' monads.
 */
export class Bifunctor<A, B> extends Functor<A> {
    constructor(value1: A, readonly value2: B) {
        super(value1);
    }

    /**
     * Returns wrapped 'second' value.
     */
    value2Of(): B {
        return this.value2;
    }

    /**
     * Allows you to map over first 'contained' value.
     */
    first(fn: Unary<A>): Bifunctor<A, B> {
        return new (this.constructor as BifunctorConstructor<A, B>)(fn(this.valueOf()), this.value2Of());
    }

    /**
     * Allows you to map over second 'contained' value.
     */
    second(fn: Unary<B>): Bifunctor<A, B> {
        return new (this.constructor as BifunctorConstructor<A, B>)(this.valueOf(), fn(this.value2Of()));
    }

    /**
     * Allows you to map 2 functions over contained values - One function over each value.
     */
    bimap(fn1, fn2): Bifunctor<A, B> {
        return new (this.constructor as BifunctorConstructor<A, B>)(
            fn1(this.valueOf()),
            fn2(this.value2Of())
        );
    }
}
