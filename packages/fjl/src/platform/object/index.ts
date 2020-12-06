/**
 * Defines some of the platform methods for objects (the ones used within `fjl`).
 */

import native from "./native";
import {HasOwnPropertyFunc, InstanceOfFunc} from "./types";
import {curry2} from "../../function/curry";
import {Lengthable} from "../../types";
import {isset} from "../../object";

export * from './types';

export const

  {assign, keys} = Object,

  instanceOf = curry2(<T>(X: Function, x: T) => x instanceof X) as InstanceOfFunc,

  length = (x: Lengthable | undefined | null): number => !isset(x) ? undefined : x.length,

  hasOwnProperty: HasOwnPropertyFunc = curry2(<T>(propKey: string, x: T): boolean =>
    Object.prototype.hasOwnProperty.call(x, propKey))
;

export {
  native
};
