/**
 * Defines some of the platform methods for objects (the ones used within `fjl`).
 */

import {HasOwnPropertyFunc, InstanceOfFunc} from "./types";
import {curry2} from "../../function/curry";
import {Lengthable} from "../../types";

export * from './types';

export const

  {assign, keys} = Object,

  instanceOf = curry2(<T>(X: Function, x: T) => x instanceof X) as InstanceOfFunc,

  length = (x: Lengthable | undefined | null): number => x === null || x === undefined ? undefined : x.length,

  hasOwnProperty: HasOwnPropertyFunc = curry2(<T>(propKey: string, x: T): boolean =>
    Object.prototype.hasOwnProperty.call(x, propKey))
;
