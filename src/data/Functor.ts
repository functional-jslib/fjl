import {isset} from '../object/isset';
import {MapFunc} from "../types";

export const toFunctor = (x: any): Functor<any> => !isset(x) || !x.map ? new Functor(x) : x;

export default class Functor<T> {
    readonly value?: T;

    constructor(value?: T) {
        this.value = value;
    }

    valueOf(): T {
        return this.value;
    }

    map(fn: MapFunc<T, Functor<T>>): Functor<T> {
        return new Functor(fn(this.valueOf(), 0, this));
    }

    fmap(fn: MapFunc<T, Functor<T>>): Functor<T> {
        return this.map(fn);
    }
}
