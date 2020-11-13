import {instanceOf} from "../platform/object";
import {CurryOf1} from "../function";
import {UnaryOf} from "../types";

export interface FunctorConstructor<T> {
    new(x: T): Functor<T>;

    readonly prototype: Functor<T>;
}

export type FunctorMapFn<T, Ftr, Ret> = UnaryOf<T, Ret>

export interface Functor<T> {
    valueOf(): T;

    map<MapOpRet>(fn: FunctorMapFn<T, Functor<T>, MapOpRet>): Functor<MapOpRet>;
}

export class Functor<T> {
    constructor(readonly value?: T) {
    }

    valueOf(): T {
        return this.value;
    }

    map<MapOpRet>(fn: FunctorMapFn<T, Functor<T>, MapOpRet>): Functor<MapOpRet> {
        return new (this.constructor as FunctorConstructor<MapOpRet>)(fn(this.valueOf()));
    }
}

export const isFunctor = instanceOf(Functor) as CurryOf1<any, boolean>,

    toFunctor = <T>(x: T): Functor<T> => !isFunctor(x) ? new Functor(x) : x as unknown as Functor<T>;
