/**
 * Created by edlc on 12/9/16.
 */
export default class Functor<T> {
    constructor(private value: T) {}
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
