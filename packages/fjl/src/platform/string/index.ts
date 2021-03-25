import {curry} from "../../function";

export * from './types';

export const split = (pattern: string | RegExp, xs: string, limit?: number): string[] => (xs || '').split(pattern, limit),

  $split = curry(split);
