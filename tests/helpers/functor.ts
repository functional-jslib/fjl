import {UnaryOf} from "../../packages/types";
import {isset} from "../../packages/object/is";

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

export const isFunctor = <T>(x: T): boolean => isset(x) && (
        x instanceof Functor || x['map'] instanceof Function
    ),

    toFunctor = <T>(x: T): Functor<T> | T => !isFunctor(x) ? new Functor(x) : x;
