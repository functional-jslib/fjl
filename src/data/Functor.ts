/**
 * Created by edlc on 12/9/16.
 */
export default class Functor<T> {
    readonly value?:T;
    constructor(value?: T) {this.value = value;}
    valueOf(): T {
        return this.value;
    }
    map(fn: (x: T) => T): Functor<T> {
        return new Functor(fn(this.valueOf()));
    }
    fmap (fn: (x: T) => T): Functor<T> {
        return this.map(fn);
    }
}
