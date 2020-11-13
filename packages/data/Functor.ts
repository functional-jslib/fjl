import {MapOp} from "../platform/array";
import {instanceOf} from "../platform/object";
import {CurryOf1} from "../function";

export interface FunctorConstructor<T> {
    new(x: T): Functor<T>;

    readonly prototype: Functor<T>;
}

export interface Functor<T> {
    valueOf(): T;

    map<MapOpRet>(fn: MapOp<T, Functor<T>, MapOpRet>): Functor<MapOpRet>; // @todo Functor map type should be `UnaryOf<T, Ret>`
}

export class Functor<T> {
    constructor(readonly value?: T) {
    }

    valueOf(): T {
        return this.value;
    }

    map<MapFuncRet>(fn: MapOp<T, Functor<T>, MapFuncRet>): Functor<MapFuncRet> {
        return new (this.constructor as FunctorConstructor<MapFuncRet>)(fn(this.valueOf()));
    }
}

export const isFunctor = instanceOf(Functor) as CurryOf1<any, boolean>,

    toFunctor = <T>(x: T): Functor<T> => !isFunctor(x) ? new Functor(x) : x as unknown as Functor<T>;
