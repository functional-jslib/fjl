import {isset} from '../object/isset';
import {MapOp} from "../types";

export const toFunctor = (x: any): Functor<any> => !isset(x) || !x.map ? new Functor(x) : x;

export default class Functor<T> {
    readonly value?: T;

    constructor(value?: T) {
        this.value = value;
    }

    valueOf(): T {
        return this.value;
    }

    map<MapFuncRet>(fn: MapOp<T, Functor<T>, MapFuncRet>): Functor<MapFuncRet> {
        return new Functor(fn(this.valueOf(), 0, this));
    }

    fmap<MapFuncRet>(fn: MapOp<T, Functor<T>, MapFuncRet>): Functor<MapFuncRet> {
        return this.map(fn);
    }
}
