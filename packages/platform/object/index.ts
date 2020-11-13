/**
 * Defines some of the platform methods for objects (the ones used within `fjl`).
 */

import native from "./native";
import {HasOwnPropertyFunc, InstanceOfFunc} from "./types";
import {curry, curry2} from "../../function/curry";
import {toCurried2Method} from "../../utils";
import {Lengthable} from "../../types";

export * from './types';

export const

    {assign, keys} = Object,

    instanceOf = curry2(<T>(X: Function, x: T) => x instanceof X) as InstanceOfFunc,

    length = (x: Lengthable | undefined | null): number => !x ? 0 : x.length,

    hasOwnProperty: HasOwnPropertyFunc = toCurried2Method('hasOwnProperty') as HasOwnPropertyFunc
;

export {
    native
};
